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
import RegisterMessages from '../RegisterMessages'

const RegisterPage = () => {
  const intl = useIntl()

  return (
    <Page>
      <PageHeader>
        <PageTitle>{intl.formatMessage(messages.editPageTitle)}</PageTitle>
        <PageActions>
          <Button
            loading={false}
            onClick={() => {
              // TODO: handle save will be implementade in next version
              // eslint-disable-next-line no-console
              console.log('Save')
            }}
          >
            {intl.formatMessage(messages.saveAction)}
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <RegisterMessages data={undefined} />
        <RegisterForm />
      </PageContent>
    </Page>
  )
}

export default RegisterPage
