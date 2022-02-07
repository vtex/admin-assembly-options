/* eslint-disable no-alert */
import React from 'react'
import { useIntl } from 'react-intl'
import {
  createSystem,
  Page,
  PageHeader,
  PageTitle,
  PageActions,
  PageContent,
  Button,
} from '@vtex/admin-ui'

import { messages } from './utils/messages'
import RegisterForm from './components/RegisterForm'

const AssemblyRegister = () => {
  const intl = useIntl()

  const [ThemeProvider] = createSystem({
    key: 'assembly-register-page',
  })

  return (
    <ThemeProvider>
      <Page csx={{ background: '#F8F9FA' }}>
        <PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
          <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
          <PageActions>
            <Button>Save</Button>
          </PageActions>
        </PageHeader>
        <PageContent>
          <RegisterForm />
        </PageContent>
      </Page>
    </ThemeProvider>
  )
}

export default AssemblyRegister
