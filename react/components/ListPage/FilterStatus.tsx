import {
  experimental_Filter as Filter,
  experimental_useFilterState as useFilterState,
} from '@vtex/admin-ui'
import type { UseFilterReturn } from '@vtex/admin-ui/dist/filters'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { messages } from '../../utils/messages'

interface Props {
  onStateChange?: (state: UseFilterReturn) => void
}

const FilterStatus = ({ onStateChange }: Props) => {
  const intl = useIntl()

  const filterStatus = useFilterState({
    items: [
      {
        label: intl.formatMessage(messages.listColumnStatusTrue),
        value: true,
        id: 'active',
      },
      {
        label: intl.formatMessage(messages.listColumnStatusFalse),
        value: false,
        id: 'inactive',
      },
    ],
    label: intl.formatMessage(messages.listHeaderStatus),
  })

  useEffect(() => {
    onStateChange?.(filterStatus)
  }, [filterStatus, onStateChange])

  return <Filter state={filterStatus} />
}

export default FilterStatus
