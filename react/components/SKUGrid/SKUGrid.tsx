import React, { Fragment } from 'react'
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

  const skuListNew = group[groupIndex].items.map((value, index) => {
    return {
      skuId: value.skuId,
      priceTable: value.priceTable,
      quantity: `${value.minValue} - ${value.maxValue}`,
      initialQuantity: value.defaultValue,
      actions: index,
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
          render: function Actions({ data }) {
            const SKUIndex = data
            const handleDelete = () => {
              // eslint-disable-next-line no-console
              console.log(`${SKUIndex} + ${groupIndex}`)
            }

            return (
              <Fragment key={SKUIndex as number}>
                <Flex direction="row" csx={{ maxWidth: '80px' }}>
                  <Menu state={menuState} hideOnClick>
                    <MenuButton display="actions" variant="tertiary" />
                    <MenuList aria-label="actions" state={menuState}>
                      <MenuItem icon={<IconPencil />}> Edit </MenuItem>
                      <MenuItem
                        onClick={handleDelete}
                        icon={<IconTrash />}
                        csx={{ color: '#CC3E3E' }}
                      >
                        {' '}
                        {data}{' '}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Fragment>
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
