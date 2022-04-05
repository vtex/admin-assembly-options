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
import { useRuntime } from 'vtex.render-runtime'
import { useQuery } from 'react-apollo'
import type {
  Query,
  QueryGetAssemblyOptionArgs,
} from 'vtexbr.assembly-options-graphql'
import { showToast } from 'vtex.admin-shell-utils'

import { messages } from '../../utils/messages'
import RegisterForm from '../RegisterForm'
import RegisterMessages from '../RegisterMessages'
import GET_ASSEMBLY_OPTION from '../../graphql/getAssemblyOption.gql'
import { HTTP_STATUS } from '../../utils/httpStatus'
import { useRedirect } from '../../hooks/useRedirect'

const EditPage = () => {
  const intl = useIntl()

  const { goToListPage } = useRedirect()

  const {
    route: {
      params: { assemblyOptionId },
    },
  } = useRuntime()

  const { data, loading } = useQuery<
    Query['getAssemblyOption'],
    QueryGetAssemblyOptionArgs
  >(GET_ASSEMBLY_OPTION, {
    variables: {
      id: assemblyOptionId,
    },
    onError: (error) => {
      if (
        error?.graphQLErrors[0]?.extensions?.exception?.response?.status ===
        HTTP_STATUS.NOT_FOUND
      ) {
        showToast({
          payload: intl.formatMessage(messages.editNotFound),
        })
      } else {
        showToast({
          payload: intl.formatMessage(messages.editErrorOnLoad),
        })
      }

      goToListPage()
    },
  })

  if (loading || !data) {
    return null
  }

  // TODO: this data should be passed to the form
  // eslint-disable-next-line no-console
  console.log('data', data)

  return (
    <Page>
      <PageHeader onPopNavigation={goToListPage}>
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
        <RegisterMessages />
        <RegisterForm />
      </PageContent>
    </Page>
  )
}

export default EditPage
