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

import { messages } from '../../utils/messages'
import RegisterForm from '../RegisterForm'
import { useRegisterContext } from '../../context/RegisterContext'

const RegisterPage = () => {
  const intl = useIntl()
  const { id, name, required, active, group } = useRegisterContext()

  const handleSave = () => {
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
