import { experimental_useFilterState as useFilterState } from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import { messages } from '../../utils/messages'

export const useFilterStatus = () => {
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

  return filterStatus
}
