import {
  useMenuState,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconPencil,
  IconTrash,
  ModalDisclosure,
  useModalState,
  Text,
  FlexSpacer,
} from '@vtex/admin-ui'
import React from 'react'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-apollo'
import type { MutationDetachAndDeleteAssemblyArgs } from 'vtexbr.assembly-options-graphql'
import { showToast } from 'vtex.admin-shell-utils'

import { useRedirect } from '../../hooks/useRedirect'
import { messages } from '../../utils/messages'
import type { TableColumns } from './AssemblyOptionDataGrid'
import ModalDelete from './ModalDelete'
import DETACH_AND_DELETE_ASSEMBLY from '../../graphql/detachAndDeleteAssemblyOption.gql'

interface Props {
  item: TableColumns
}

const Actions = ({ item }: Props) => {
  const intl = useIntl()

  const stateModal = useModalState()

  const { goToEditPage } = useRedirect()

  const menuState = useMenuState()

  const [detachAndDeleteAssemblyOption] = useMutation<
    boolean,
    MutationDetachAndDeleteAssemblyArgs
  >(DETACH_AND_DELETE_ASSEMBLY, {
    onError: () => {
      showToast({
        payload: intl.formatMessage(messages.deleteError),
      })
    },
    onCompleted: () => {
      showToast({
        payload: intl.formatMessage(messages.deleteSuccess),
      })
    },
    refetchQueries: ['ListAssemblyOptions'],
  })

  return (
    <Flex direction="row" csx={{ maxWidth: '80px' }}>
      <Menu state={menuState} hideOnClick>
        <MenuButton display="actions" variant="tertiary" />
        <MenuList aria-label="actions" state={menuState}>
          <MenuItem
            onClick={() => {
              goToEditPage(item.assemblyOptionId)
            }}
            icon={<IconPencil />}
          >
            {intl.formatMessage(messages.listEditAction)}
          </MenuItem>
          <ModalDisclosure state={stateModal}>
            <Flex direction="row" csx={{ cursor: 'pointer' }}>
              <IconTrash csx={{ color: '#CC3D3D' }} />
              <FlexSpacer />
              <Text tone="critical">
                {intl.formatMessage(messages.deleteAction)}
              </Text>
            </Flex>
          </ModalDisclosure>
          <ModalDelete
            name={item.name}
            id={item.assemblyOptionId}
            state={stateModal}
            deleteAction={detachAndDeleteAssemblyOption}
          />
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default Actions
