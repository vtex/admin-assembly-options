import React, { useEffect, useRef, useState } from 'react'
import {
  Page,
  PageHeader,
  PageTitle,
  PageActions,
  PageContent,
  Button,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'
import type {
  MutationCreateAssemblyOptionArgs,
  AssemblyOption,
  AssemblyOptionConfigInput,
} from 'vtex.assembly-options-graphql'
import { useMutation } from 'react-apollo'
import { showToast } from 'vtex.admin-shell-utils'

import { messages } from '../../utils/messages'
import RegisterForm from '../RegisterForm'
import type { RegisterFormHandle } from '../RegisterForm/RegisterForm'
import RegisterMessages from '../RegisterMessages'
import { useRegisterContext } from '../../context/RegisterContext'
import CREATE_ASSEMBLY from '../../graphql/CREATE_ASSEMBLY.gql'
import { useRedirect } from '../../hooks/useRedirect'

const RegisterPage = () => {
  const intl = useIntl()

  const { goToListPage } = useRedirect()

  const [handlingSave, setHandlingSave] = useState(false)

  const registerFormRef = useRef<RegisterFormHandle>(null)

  const { name, required, active, group } = useRegisterContext()

  const [createAssembly, { error, loading }] = useMutation<
    AssemblyOption,
    MutationCreateAssemblyOptionArgs
  >(CREATE_ASSEMBLY, {
    onCompleted: () => {
      showToast({
        payload: intl.formatMessage(messages.assemblygraphQLSuccess),
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

  // effect to get form values updated from Register Context
  useEffect(() => {
    if (handlingSave) {
      setHandlingSave(false)

      createAssembly({
        variables: {
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
        },
      })
    }
  }, [name, required, active, group, handlingSave, createAssembly])

  return (
    <Page csx={{ paddingBottom: '8em' }}>
      <PageHeader onPopNavigation={goToListPage}>
        <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
        <PageActions>
          <Button loading={loading} onClick={handleSave}>
            {intl.formatMessage(messages.saveAction)}
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <RegisterMessages error={error} />
        <RegisterForm ref={registerFormRef} />
      </PageContent>
    </Page>
  )
}

export default RegisterPage
