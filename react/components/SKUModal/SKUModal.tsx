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
import { Formik } from 'formik'
import { FormikInput, FormikNumericStepper } from '@vtex/admin-formik'

import { messages } from '../../utils/messages'

const SKUModal = () => {
  const intl = useIntl()
  const modal = useModalState()

  const initialValue = {
    id: 0,
    priceTable: '',
    minimum: 0,
    maximum: 0,
    initial: 0,
  }

  const handleSubmit = () => {
    /* eslint-disable no-alert */
    alert('Values submitted: ')
  }

  return (
    <Box>
      <ModalDisclosure state={modal}>
        <Button variant="secondary" csx={{ marginTop: 3 }}>
          {intl.formatMessage(messages.addSKUButton)}
        </Button>
      </ModalDisclosure>
      <Modal aria-label="SKU modal" state={modal} size="regular">
        <Formik initialValues={initialValue} onSubmit={handleSubmit}>
          <form>
            <ModalHeader title="SKU" />
            <ModalContent>
              <Flex direction="column">
                <FormikInput name="id" label="SKU ID" />
                <FormikInput
                  name="priceTable"
                  label={`${intl.formatMessage(messages.SKUPriceTableLabel)}`}
                />
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
                        name="minimum"
                        label={`${intl.formatMessage(messages.SKUItemMin)}`}
                      />
                    </Box>
                    <Box csx={{ width: '1/2' }}>
                      <Label csx={{ width: '100px', display: 'flex' }}>
                        {intl.formatMessage(messages.SKUItemMax)}
                      </Label>
                      <FormikNumericStepper
                        name="maximum"
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
                    name="initial"
                    label={`${intl.formatMessage(messages.SKUItemInitial)}`}
                  />
                </Box>
              </Flex>
            </ModalContent>
            <ModalFooter>
              <Flex justify="end">
                <Button variant="secondary">
                  {' '}
                  {intl.formatMessage(messages.SKUItemConfirm)}
                </Button>
                <Button>{intl.formatMessage(messages.SKUItemConfirm)}</Button>
              </Flex>
            </ModalFooter>
          </form>
        </Formik>
      </Modal>
    </Box>
  )
}

export default SKUModal
