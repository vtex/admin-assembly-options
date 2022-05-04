import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalButton,
  Text,
  Flex,
  Heading,
} from '@vtex/admin-ui'
import type { DialogStateReturn } from 'reakit/ts/Dialog/DialogState'
import { useIntl, FormattedMessage } from 'react-intl'

import { messages } from '../../utils/messages'

interface Props {
  name: string
  id: string
  state: DialogStateReturn
  deleteAction: (id: string) => void
}

const ModalDelete = (props: Props) => {
  const intl = useIntl()

  const { state, name, id, deleteAction } = props

  return (
    <Modal size="small" state={state} aria-label="Delete modal">
      <ModalHeader title={intl.formatMessage(messages.deleteTitle)} />
      <ModalContent>
        <Heading as="h3" csx={{ fontSize: '0.9rem', paddingBottom: '10px' }}>
          <FormattedMessage
            id="admin/assembly.list.delete-message-title"
            values={{
              name,
              id,
            }}
          />
        </Heading>
        <Text variant="body">
          <FormattedMessage id="admin/assembly.list.delete-message" />
        </Text>
      </ModalContent>
      <ModalFooter>
        <Flex justify="end">
          <ModalButton variant="tertiary" closeModalOnClick>
            {intl.formatMessage(messages.adminCancel)}
          </ModalButton>
          <ModalButton
            variant="danger"
            closeModalOnClick
            onClick={() => deleteAction(id)}
          >
            {intl.formatMessage(messages.deleteAction)}
          </ModalButton>
        </Flex>
      </ModalFooter>
    </Modal>
  )
}

export default ModalDelete
