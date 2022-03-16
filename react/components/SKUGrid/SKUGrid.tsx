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
  const { group, setAssemblyGroup } = useRegisterContext()
  const { groupIndex } = props
  const intl = useIntl()

  const skuListNew = group[groupIndex].items.map((value, index) => {
    return {
      id: index,
      skuId: value.skuId,
      priceTable: value.priceTable,
      quantity: `${value.minValue} - ${value.maxValue}`,
      initialQuantity: value.defaultValue,
      handleDelete: () => {
        const newGroup = [...group]

        newGroup[groupIndex].items.splice(index, 1)

        setAssemblyGroup(newGroup)
      },
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
          type: 'root',
          render: function Actions({ item }) {
            const menuState = useMenuState()

            return (
              <Flex direction="row" csx={{ maxWidth: '80px' }}>
                <Menu state={menuState} hideOnClick>
                  <MenuButton display="actions" variant="tertiary" />
                  <MenuList aria-label="actions" state={menuState}>
                    <MenuItem icon={<IconPencil />}> Edit </MenuItem>
                    <MenuItem
                      onClick={item.handleDelete}
                      icon={<IconTrash />}
                      csx={{ color: '#CC3E3E' }}
                    >
                      {' '}
                      {'Delete'}{' '}
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
