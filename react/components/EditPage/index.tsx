import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Page,
  PageHeader,
  PageTitle,
  PageActions,
  PageContent,
  Button,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { useMutation, useQuery } from 'react-apollo'
import type {
  AssemblyOption,
  AssemblyOptionConfigInput,
  MutationUpdateAssemblyOptionArgs,
  QueryGetAssemblyOptionArgs,
} from 'vtex.assembly-options-graphql'
import { showToast } from 'vtex.admin-shell-utils'

import { messages } from '../../utils/messages'
import RegisterForm from '../RegisterForm'
import RegisterMessages from '../RegisterMessages'
import GET_ASSEMBLY_OPTION from '../../graphql/getAssemblyOption.gql'
import { HTTP_STATUS } from '../../utils/httpStatus'
import { useRedirect } from '../../hooks/useRedirect'
import type { RegisterFormHandle } from '../RegisterForm/RegisterForm'
import UPDATE_ASSEMBLY_OPTION from '../../graphql/updateAssemblyOption.gql'
import { useRegisterContext } from '../../context/RegisterContext'

const EditPage = () => {
  const intl = useIntl()

  const { goToListPage } = useRedirect()

  const {
    route: {
      params: { assemblyOptionId },
    },
  } = useRuntime()

  const [handlingSave, setHandlingSave] = useState(false)

  const registerFormRef = useRef<RegisterFormHandle>(null)

  const { name, required, active, group } = useRegisterContext()

  const { data, loading: getLoading } = useQuery<
    { getAssemblyOption: AssemblyOption },
    QueryGetAssemblyOptionArgs
  >(GET_ASSEMBLY_OPTION, {
    fetchPolicy: 'no-cache',
    variables: {
      id: assemblyOptionId,
    },
    onError: (error) => {
      if (
        error?.graphQLErrors[0]?.extensions?.exception?.response?.status ===
        HTTP_STATUS.NOT_FOUND
      ) {
        showToast({
          payload: intl.formatMessage(messages.editNotFound),
        })
      } else {
        showToast({
          payload: intl.formatMessage(messages.editErrorOnLoad),
        })
      }

      goToListPage()
    },
  })

  const [updateAssembly, { error, loading: updateLoading }] = useMutation<
    AssemblyOption,
    MutationUpdateAssemblyOptionArgs
  >(UPDATE_ASSEMBLY_OPTION, {
    onCompleted: () => {
      showToast({
        payload: intl.formatMessage(messages.editUpdateSuccess),
      })

      goToListPage()
    },
  })

  const handleSave = async () => {
    await registerFormRef?.current?.handleSubmit()

    const formIsValid = registerFormRef?.current?.validateForm()

    if (formIsValid) {
      setHandlingSave(true)
    }
  }

  const buildVariables = useCallback(
    (id: string) => ({
      id,
      assemblyOption: {
        name,
        isRequired: required,
        isActive: active,
        configs: group.map((item) => {
          return {
            name: item.name,
            maxItems: item.maxItems,
            minItems: item.minItems,
            items: item.items,
          } as AssemblyOptionConfigInput
        }),
      },
    }),
    [active, group, name, required]
  )

  // effect to get form values updated from Register Context
  useEffect(() => {
    if (handlingSave) {
      setHandlingSave(false)

      if (data?.getAssemblyOption.id) {
        updateAssembly({
          variables: buildVariables(data?.getAssemblyOption.id),
        })
      }
    }
  }, [buildVariables, data?.getAssemblyOption.id, handlingSave, updateAssembly])

  if (getLoading || !data) {
    return null
  }

  return (
    <Page>
      <PageHeader onPopNavigation={goToListPage}>
        <PageTitle>
          {data.getAssemblyOption.name ||
            intl.formatMessage(messages.editPageTitle)}
        </PageTitle>
        <PageActions>
          <Button loading={updateLoading} onClick={handleSave}>
            {intl.formatMessage(messages.saveAction)}
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <RegisterMessages error={error} />
        <RegisterForm
          ref={registerFormRef}
          assemblyOption={data.getAssemblyOption}
        />
      </PageContent>
    </Page>
  )
}

export default EditPage
