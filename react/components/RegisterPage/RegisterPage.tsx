import React from 'react'
import {
  Page,
  PageHeader,
  PageTitle,
  PageActions,
  PageContent,
  Button,
  Alert,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-apollo'
import type {
  MutationCreateAssemblyOptionArgs,
  AssemblyOption,
} from 'vtexbr.assembly-options-graphql'

import { messages } from '../../utils/messages'
import RegisterForm from '../RegisterForm'
import { useRegisterContext } from '../../context/RegisterContext'
import CREATE_ASSEMBLY from '../../graphql/CREATE_ASSEMBLY.gql'

const RegisterPage = () => {
  const intl = useIntl()
  const { name, required, active, group } = useRegisterContext()
  const [createAssembly, { data, loading, error }] = useMutation<
    AssemblyOption,
    MutationCreateAssemblyOptionArgs
  >(CREATE_ASSEMBLY)

  if (loading) {
    // eslint-disable-next-line no-console
    console.log('submitting')
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error.graphQLErrors[0].extensions.exception.graphQLErrors)

    return (
      <Alert visible tone="critical">
        {error.graphQLErrors[0].extensions.exception.graphQLErrors[0].code}
      </Alert>
    )
  }

  if (data) {
    return (
      <Alert visible tone="positive">
        Assembly Option enviado com sucesso
      </Alert>
    )
  }

  const handleSave = () => {
    createAssembly({
      variables: {
        assemblyOption: {
          name,
          isRequired: required,
          isActive: active,
          configs: group,
        },
      },
    })
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
        <PageActions>
          <Button onClick={handleSave}>Save</Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <RegisterForm />
      </PageContent>
    </Page>
  )
}

export default RegisterPage
