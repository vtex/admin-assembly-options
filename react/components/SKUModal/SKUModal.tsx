/* eslint-disable prettier/prettier */
import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalDisclosure,
  useModalState,
  Button,
  Box,
  Label,
  Flex,
  Heading,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'
import { FormikInput, FormikNumericStepper } from '@vtex/admin-formik'

import { messages } from '../../utils/messages'

const SKUModal = () => {
  const intl = useIntl()
  const modal = useModalState()

  return (
    <Box>
      <ModalDisclosure state={modal}>
        <Button variant="tertiary">
          {intl.formatMessage(messages.addSKUButton)}
        </Button>
      </ModalDisclosure>
      <Modal aria-label="SKU modal" state={modal} size="regular">
        <ModalHeader title="SKU" />
        <ModalContent>
          <Flex direction="row">
            <Box csx={{ width: '1/2', paddingRight: 2 }}>
              <FormikInput name="assembly.key.sku.id" label="SKU ID" />
            </Box>
            <Box csx={{ width: '1/2' }}>
              <FormikInput
                name="assembly.key.sku.priceTable"
                label={`${intl.formatMessage(messages.SKUPriceTableLabel)}`}
              />
            </Box>
          </Flex>
          <Heading csx={{ marginTop: 5 }}>
            {intl.formatMessage(messages.SKUItemHeading)}
          </Heading>
          <Flex csx={{ marginTop: 2 }}>
            <Box csx={{ width: '1/2', paddingRight: 2 }}>
              <Flex direction="row">
                <Box csx={{ width: '1/2' }}>
                  <Label csx={{ width: '100px', display: 'flex' }}>
                    {intl.formatMessage(messages.SKUItemMin)}
                  </Label>
                  <FormikNumericStepper
                    name="assembly.key.sku.minimum"
                    label={`${intl.formatMessage(messages.SKUItemMin)}`}
                  />
                </Box>
                <Box csx={{ width: '1/2' }}>
                  <Label csx={{ width: '100px', display: 'flex' }}>
                    {intl.formatMessage(messages.SKUItemMax)}
                  </Label>
                  <FormikNumericStepper
                    name="assembly.key.sku.maximum"
                    label={`${intl.formatMessage(messages.SKUItemMax)}`}
                  />
                </Box>
              </Flex>
            </Box>
            <Box csx={{ width: '1/2' }}>
              <Label csx={{ width: '100px', display: 'flex' }}>
                {intl.formatMessage(messages.SKUItemInitial)}
              </Label>
              <FormikNumericStepper
                name="assembly.key.sku.initial"
                label={`${intl.formatMessage(messages.SKUItemInitial)}`}
              />
            </Box>
          </Flex>
        </ModalContent>
        <ModalFooter>
          <Button>{intl.formatMessage(messages.SKUItemConfirm)}</Button>
        </ModalFooter>
      </Modal>
    </Box>
  )
}

export default SKUModal
