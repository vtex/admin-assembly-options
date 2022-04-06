import React, { useEffect } from 'react'
import type { DataGridColumn } from '@vtex/admin-ui'
import {
  Flex,
  Skeleton,
  Search,
  useSearchState,
  usePaginationState,
  DataGrid,
  DataView,
  useDataViewState,
  useDataGridState,
  Tag,
  DataViewControls,
  Pagination,
  experimental_Filter as Filter,
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
import { useFilterStatus } from './useFilterStatus'
import Actions from './Actions'

export interface TableColumns extends AssemblyOptionHeader {
  assemblyOptionId: string
}

interface AssemblyOptionPageResponseData extends AssemblyOptionPageResponse {
  data: TableColumns[]
}

const PAGE_SIZE = 10

const AssemblyOptionDataGrid = () => {
  const intl = useIntl()

  const filterStatus = useFilterStatus()

  const view = useDataViewState()

  const pagination = usePaginationState({
    pageSize: PAGE_SIZE,
  })

  const searchState = useSearchState({
    timeoutMs: 500,
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
    {
      id: 'actions',
      header: intl.formatMessage(messages.listActions),
      resolver: {
        type: 'root',
        render: ({ item, context }) => {
          if (context.status === 'loading') {
            return <Skeleton csx={{ height: 24 }} />
          }

          return <Actions item={item} />
        },
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
      name: searchState.debouncedValue ?? undefined,
      active: filterStatus?.appliedItem
        ? Boolean(filterStatus.appliedItem.value)
        : undefined,
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
        <Flex
          csx={{
            flexDirection: 'column',
            width: '100%',
            '@tablet': {
              flexDirection: 'row',
            },
          }}
        >
          <Flex
            csx={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              '@tablet': {
                width: '50%',
              },
            }}
          >
            <Search
              csx={{ marginRight: '10px' }}
              id="search"
              state={searchState}
              placeholder={intl.formatMessage(messages.listSearchPlaceholder)}
            />
            <Filter state={filterStatus} />
          </Flex>
          <Flex
            csx={{
              width: '100%',
              justifyContent: 'flex-start',
              marginTop: '10px',
              '@tablet': {
                width: '50%',
                justifyContent: 'end',
                marginTop: '0px',
              },
            }}
          >
            <Pagination
              state={pagination}
              preposition={intl.formatMessage(messages.paginationPreposition)}
              subject={intl.formatMessage(messages.paginationSubject)}
              prevLabel={intl.formatMessage(messages.paginationPrevLabel)}
              nextLabel={intl.formatMessage(messages.paginationNextLabel)}
            />
          </Flex>
        </Flex>
      </DataViewControls>
      <DataGrid state={grid} />
    </DataView>
  )
}

export default AssemblyOptionDataGrid
