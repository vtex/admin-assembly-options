import React from 'react'
import {
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  PageActions,
  Button,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import { messages } from '../../utils/messages'
import AssemblyOptionDataGrid from './AssemblyOptionDataGrid'
import { useRedirect } from '../../hooks/useRedirect'

const ListPage = () => {
  const intl = useIntl()

  const { goToRegisterPage } = useRedirect()

  return (
    <Page>
      <PageHeader>
        <PageTitle>{intl.formatMessage(messages.pageTitleList)}</PageTitle>
        <PageActions>
          <Button onClick={goToRegisterPage}>
            {intl.formatMessage(messages.addAssemblyOption)}
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <AssemblyOptionDataGrid />
      </PageContent>
    </Page>
  )
}

export default ListPage
