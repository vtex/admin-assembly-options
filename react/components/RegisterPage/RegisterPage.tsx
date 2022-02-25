import React from 'react'
import {
  Page,
  PageHeader,
  PageTitle,
  PageActions,
  PageContent,
  Button,
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
  const { id, name, required, active, group } = useRegisterContext()
  const [createAssembly] = useMutation<
    AssemblyOption,
    MutationCreateAssemblyOptionArgs
  >(CREATE_ASSEMBLY)

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

    // eslint-disable-next-line no-console
    console.log({
      id,
      name,
      required,
      active,
      group,
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
