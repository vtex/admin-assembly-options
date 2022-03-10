import React, { useState, useEffect } from 'react'
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
import RegisterMessages from '../RegisterMessages'
import { useRegisterContext } from '../../context/RegisterContext'
import CREATE_ASSEMBLY from '../../graphql/CREATE_ASSEMBLY.gql'

const RegisterPage = () => {
  const intl = useIntl()
  const [load, setLoad] = useState(false)
  const { name, required, active, group } = useRegisterContext()
  const [createAssembly] = useMutation<
    AssemblyOption,
    MutationCreateAssemblyOptionArgs
  >(CREATE_ASSEMBLY)

  useEffect(() => {
    setLoad(loading)
  }, [loading])

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
          <Button loading={load} onClick={handleSave}>
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
