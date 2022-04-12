import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalButton,
  Text,
  Flex,
} from '@vtex/admin-ui'
import type { DialogStateReturn } from 'reakit/ts/Dialog/DialogState'
import { useIntl } from 'react-intl'

import { messages } from '../../utils/messages'

interface Props {
  name: string
  id: string
  state: DialogStateReturn
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteAction: any
}

const ModalDelete = (props: Props) => {
  const intl = useIntl()

  const { state, name, id, deleteAction } = props

  return (
    <Modal state={state} aria-label="Delete modal">
      <ModalHeader title={`ID: ${id} - ${name}`} />
      <ModalContent>
        <Text>{intl.formatMessage(messages.deleteMessage)}</Text>
      </ModalContent>
      <ModalFooter>
        <Flex justify="end">
          <ModalButton variant="secondary" closeModalOnClick>
            {intl.formatMessage(messages.adminCancel)}
          </ModalButton>
          <ModalButton
            variant="danger"
            closeModalOnClick
            onClick={() =>
              deleteAction({
                variables: {
                  id,
                },
              })
            }
          >
            {intl.formatMessage(messages.deleteAction)}
          </ModalButton>
        </Flex>
      </ModalFooter>
    </Modal>
  )
}

export default ModalDelete
