import React, { useEffect } from 'react'
import type { DataGridColumn } from '@vtex/admin-ui'
import {
  usePaginationState,
  DataGrid,
  DataView,
  useDataViewState,
  useDataGridState,
  Tag,
  DataViewControls,
  FlexSpacer,
  Pagination,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-apollo'
import type {
  AssemblyOptionPageResponse,
  AssemblyOptionHeader,
  QueryListAssemblyOptionsArgs,
} from 'vtexbr.assembly-options-graphql'

import LIST_ASSEMBLY_OPTIONS from '../../graphql/listAssemblyOptions.gql'
import { messages } from '../../utils/messages'

interface TableColumns extends AssemblyOptionHeader {
  assemblyOptionId: string
}

interface AssemblyOptionPageResponseData extends AssemblyOptionPageResponse {
  data: TableColumns[]
}

const PAGE_SIZE = 10

const AssemblyOptionDataGrid = () => {
  const intl = useIntl()

  const view = useDataViewState()

  const pagination = usePaginationState({
    pageSize: PAGE_SIZE,
  })

  const columns: Array<DataGridColumn<TableColumns>> = [
    {
      id: 'assemblyOptionId',
      header: intl.formatMessage(messages.listHeaderId),
    },
    {
      id: 'name',
      header: intl.formatMessage(messages.listHeaderName),
    },
    {
      id: 'isActive',
      header: intl.formatMessage(messages.listHeaderStatus),
      resolver: {
        type: 'plain',
        render: ({ data }) =>
          data ? (
            <Tag
              label={intl.formatMessage(messages.listColumnStatusTrue)}
              palette="green"
              size="small"
            />
          ) : (
            <Tag
              label={intl.formatMessage(messages.listColumnStatusFalse)}
              palette="red"
              size="small"
            />
          ),
      },
    },
    {
      id: 'isRequired',
      header: intl.formatMessage(messages.listHeaderRequired),
      resolver: {
        type: 'plain',
        render: ({ data }) =>
          data ? (
            <Tag
              label={intl.formatMessage(messages.listColumnRequiredTrue)}
              palette="green"
              size="small"
            />
          ) : (
            <Tag
              label={intl.formatMessage(messages.listColumnRequiredFalse)}
              palette="red"
              size="small"
            />
          ),
      },
    },
  ]

  const { data, loading } = useQuery<
    {
      listAssemblyOptions: AssemblyOptionPageResponseData
    },
    QueryListAssemblyOptionsArgs
  >(LIST_ASSEMBLY_OPTIONS, {
    variables: {
      page: pagination.currentPage,
      perPage: PAGE_SIZE,
    },
    onCompleted: (resultData) => {
      if (
        pagination.total !== resultData.listAssemblyOptions.pagination.total
      ) {
        pagination.paginate({
          type: 'setTotal',
          total: resultData
            ? resultData.listAssemblyOptions.pagination.total
            : 0,
        })
      }

      if (resultData.listAssemblyOptions.data.length > 0) {
        view.setStatus({
          type: 'ready',
        })
      } else {
        view.setStatus({
          type: 'empty',
          message: intl.formatMessage(messages.noResults),
        })
      }
    },
    onError: () => {
      view.setStatus({
        type: 'error',
        message: intl.formatMessage(messages.queryError),
      })
    },
  })

  const grid = useDataGridState({
    view,
    columns,
    items: data ? data.listAssemblyOptions.data : [],
    length: 5,
  })

  useEffect(() => {
    if (loading && view.status !== 'loading') {
      view.setStatus({
        type: 'loading',
      })
    }
  }, [loading, view, pagination.currentPage])

  return (
    <DataView state={view}>
      <DataViewControls>
        <FlexSpacer />
        <Pagination
          state={pagination}
          preposition={intl.formatMessage(messages.paginationPreposition)}
          subject={intl.formatMessage(messages.paginationSubject)}
          prevLabel={intl.formatMessage(messages.paginationPrevLabel)}
          nextLabel={intl.formatMessage(messages.paginationNextLabel)}
        />
      </DataViewControls>
      <DataGrid state={grid} />
    </DataView>
  )
}

export default AssemblyOptionDataGrid
