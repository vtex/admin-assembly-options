import React, { useCallback } from 'react'
import {
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  PageActions,
  Button,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import { messages } from '../../utils/messages'
import AssemblyOptionDataGrid from './AssemblyOptionDataGrid'

const ListPage = () => {
  const intl = useIntl()
  const { navigate } = useRuntime()

  const handleAddNew = useCallback(() => {
    navigate({
      page: 'admin.app.assembly-options-register',
    })
  }, [navigate])

  return (
    <Page>
      <PageHeader>
        <PageTitle>{intl.formatMessage(messages.pageTitleList)}</PageTitle>
        <PageActions>
          <Button onClick={handleAddNew}>
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
