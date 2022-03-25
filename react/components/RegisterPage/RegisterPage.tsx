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
import type {
  MutationCreateAssemblyOptionArgs,
  AssemblyOption,
} from 'vtexbr.assembly-options-graphql'
import { useMutation } from 'react-apollo'

import { messages } from '../../utils/messages'
import RegisterForm from '../RegisterForm'
import RegisterMessages from '../RegisterMessages'
import { useRegisterContext } from '../../context/RegisterContext'
import CREATE_ASSEMBLY from '../../graphql/CREATE_ASSEMBLY.gql'
import { useGroupFormContext } from '../../context/GroupFormContext'

const RegisterPage = () => {
  const intl = useIntl()
  const { name, required, active, group } = useRegisterContext()

  const { submitAndValidateForms } = useGroupFormContext()

  const [createAssembly, { data, error, loading }] = useMutation<
    AssemblyOption,
    MutationCreateAssemblyOptionArgs
  >(CREATE_ASSEMBLY)

  const handleSave = async () => {
    const formsAreValid = await submitAndValidateForms()

    if (formsAreValid) {
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
        <RegisterForm />
      </PageContent>
    </Page>
  )
}

export default RegisterPage
