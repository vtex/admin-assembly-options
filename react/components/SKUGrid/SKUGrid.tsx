import React from 'react'
import {
  useDataGridState,
  DataGrid,
  Flex,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  useMenuState,
  IconPencil,
  IconTrash,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import { messages } from '../../utils/messages'
import { useRegisterContext } from '../../context/RegisterContext'

interface Props {
  groupIndex: number
}

const SKUGrid = (props: Props) => {
  const { group } = useRegisterContext()
  const { groupIndex } = props
  const intl = useIntl()
  const menuState = useMenuState()

  const skuListNew = group[groupIndex].skus.map((value) => {
    return {
      skuId: value.id,
      priceTable: value.priceTable,
      quantity: `${value.minimum} - ${value.maximum}`,
      initialQuantity: value.initial,
    }
  })

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
        id: 'quantity',
        header: `${intl.formatMessage(messages.SKUItemQuantity)}`,
      },
      {
        id: 'initialQuantity',
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
                <Menu state={menuState} hideOnClick>
                  <MenuButton display="actions" variant="tertiary" />
                  <MenuList aria-label="actions" state={menuState}>
                    <MenuItem icon={<IconPencil />}> Edit </MenuItem>
                    <MenuItem icon={<IconTrash />} csx={{ color: '#CC3E3E' }}>
                      {' '}
                      Delete{' '}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            )
          },
        },
      },
    ],

    items: skuListNew,
  })

  return <DataGrid csx={{ marginTop: 5 }} state={state} />
}

export default SKUGrid
