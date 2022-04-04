import {
  useMenuState,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconPencil,
} from '@vtex/admin-ui'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import { messages } from '../../utils/messages'
import type { TableColumns } from './AssemblyOptionDataGrid'

interface Props {
  item: TableColumns
}

const Actions = ({ item }: Props) => {
  const intl = useIntl()

  const { navigate } = useRuntime()

  const menuState = useMenuState()

  return (
    <Flex direction="row" csx={{ maxWidth: '80px' }}>
      <Menu state={menuState} hideOnClick>
        <MenuButton display="actions" variant="tertiary" />
        <MenuList aria-label="actions" state={menuState}>
          <MenuItem
            onClick={() => {
              navigate({
                page: 'admin.app.assembly-options-edit',
                params: {
                  assemblyOptionId: item.assemblyOptionId,
                },
              })
            }}
            icon={<IconPencil />}
          >
            {intl.formatMessage(messages.listEditAction)}
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default Actions
