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
} from 'vtexbr.assembly-options-graphql'
import { useMutation } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { showToast } from 'vtex.admin-shell-utils'

import { messages } from '../../utils/messages'
import RegisterForm from '../RegisterForm'
import type { RegisterFormHandle } from '../RegisterForm/RegisterForm'
import RegisterMessages from '../RegisterMessages'
import { useRegisterContext } from '../../context/RegisterContext'
import CREATE_ASSEMBLY from '../../graphql/CREATE_ASSEMBLY.gql'

const RegisterPage = () => {
  const intl = useIntl()

  const { navigate } = useRuntime()

  const [handlingSave, setHandlingSave] = useState(false)

  const registerFormRef = useRef<RegisterFormHandle>(null)

  const { name, required, active, group } = useRegisterContext()

  const goToListPage = () => {
    navigate({
      page: 'admin.app.assembly-options-list',
    })
  }

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

  const handleBackAction = () => {
    goToListPage()
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
    <Page>
      <PageHeader onPopNavigation={handleBackAction}>
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
