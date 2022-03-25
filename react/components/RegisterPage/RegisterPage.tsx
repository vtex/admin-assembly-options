import React, { useRef } from 'react'
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

import { messages } from '../../utils/messages'
import RegisterForm from '../RegisterForm'
import type { RegisterFormHandle } from '../RegisterForm/RegisterForm'
import RegisterMessages from '../RegisterMessages'
import { useRegisterContext } from '../../context/RegisterContext'
import CREATE_ASSEMBLY from '../../graphql/CREATE_ASSEMBLY.gql'

const RegisterPage = () => {
  const intl = useIntl()

  const registerFormRef = useRef<RegisterFormHandle>(null)

  const { name, required, active, group } = useRegisterContext()

  const [createAssembly, { data, error, loading }] = useMutation<
    AssemblyOption,
    MutationCreateAssemblyOptionArgs
  >(CREATE_ASSEMBLY)

  const handleSave = async () => {
    await registerFormRef.current?.handleSubmit()

    const formIsValid = registerFormRef.current?.validateForm()

    if (formIsValid) {
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
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
        <PageActions>
          <Button loading={loading} onClick={handleSave}>
            Save
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <RegisterMessages data={data} error={error} />
        <RegisterForm ref={registerFormRef} />
      </PageContent>
    </Page>
  )
}

export default RegisterPage
