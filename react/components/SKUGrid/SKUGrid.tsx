import React from 'react'
import {
  useDataGridState,
  DataGrid,
  Flex,
  FlexSpacer,
  IconTrash,
  IconPencil,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import { messages } from '../../utils/messages'

const SKUGrid = () => {
  const intl = useIntl()

  const state = useDataGridState({
    columns: [
      {
        id: 'skuId',
        header: 'SKU ID',
      },
      {
        id: 'priceTable',
        header: `${intl.formatMessage(messages.SKUPriceTable)}`,
      },
      {
        id: 'minimumValue',
        header: `${intl.formatMessage(messages.SKUItemMin)}`,
      },
      {
        id: 'maximumValue',
        header: `${intl.formatMessage(messages.SKUItemMax)}`,
      },
      {
        id: 'initialValue',
        header: `${intl.formatMessage(messages.SKUItemInitial)}`,
      },
      {
        id: 'actions',
        header: `${intl.formatMessage(messages.SKUActions)}`,
        resolver: {
          type: 'plain',
          render: function Actions() {
            return (
              <Flex direction="row" csx={{ maxWidth: '80px' }}>
                <IconPencil />
                <FlexSpacer />
                <IconTrash />
              </Flex>
            )
          },
        },
      },
    ],

    items: [
      {
        skuId: 1,
        priceTable: 'Teste',
        minimumValue: 1,
        maximumValue: 3,
        initialValue: 1,
      },
    ],
  })

  return <DataGrid csx={{ marginTop: 5 }} state={state} />
}

export default SKUGrid
