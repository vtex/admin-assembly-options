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
  useToast,
} from '@vtex/admin-ui'
import React from 'react'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-apollo'
import type { MutationDetachAndDeleteAssemblyArgs } from 'vtexbr.assembly-options-graphql'

import { useRedirect } from '../../hooks/useRedirect'
import { messages } from '../../utils/messages'
import type { TableColumns } from './AssemblyOptionDataGrid'
import ModalDelete from './ModalDelete'
import DETACH_AND_DELETE_ASSEMBLY from '../../graphql/detachAndDeleteAssemblyOption.gql'
import LIST_ASSEMBLY_OPTIONS from '../../graphql/listAssemblyOptions.gql'

interface Props {
  item: TableColumns
}

const Actions = ({ item }: Props) => {
  const intl = useIntl()

  const stateModal = useModalState()

  const { goToEditPage } = useRedirect()

  const menuState = useMenuState()

  const showToast = useToast()

  const [detachAndDeleteAssemblyOption] = useMutation<
    boolean,
    MutationDetachAndDeleteAssemblyArgs
  >(DETACH_AND_DELETE_ASSEMBLY, {
    fetchPolicy: 'no-cache',
    onError: () => {
      showToast({
        tone: 'critical',
        message: intl.formatMessage(messages.deleteError),
        duration: 3000,
      })
    },
    onCompleted: () => {
      showToast({
        tone: 'positive',
        message: intl.formatMessage(messages.deleteSuccess),
        duration: 3000,
      })
    },
    refetchQueries: [LIST_ASSEMBLY_OPTIONS],
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
            deleteAction={(id) =>
              detachAndDeleteAssemblyOption({ variables: { id } })
            }
          />
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default Actions
