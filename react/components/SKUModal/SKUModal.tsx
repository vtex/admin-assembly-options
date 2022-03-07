import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalDisclosure,
  ModalButton,
  useModalState,
  Button,
  Box,
  Label,
  Flex,
  Heading,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'
import { Formik, Form } from 'formik'
import { FormikInput, FormikNumericStepper } from '@vtex/admin-formik'

import type { SKUType } from '../../context/RegisterContext'
import { messages } from '../../utils/messages'

interface Props {
  handleClose: (form: SKUType) => void
}

const SKUModal = (props: Props) => {
  const { handleClose } = props
  const intl = useIntl()
  const modal = useModalState()

  const initialValue: SKUType = {
    skuId: '0',
    priceTable: '',
    minValue: 0,
    maxValue: 0,
    defaultValue: 0,
  }

  const handleSubmit = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: SKUType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const newSKU: SKUType = {
      skuId: values.skuId,
      priceTable: values.priceTable,
      minValue: values.minValue,
      maxValue: values.maxValue,
      defaultValue: values.defaultValue,
    }

    handleClose(newSKU)
    setSubmitting(false)
  }

  return (
    <Box>
      <ModalDisclosure state={modal}>
        <Button variant="tertiary" csx={{ marginTop: 3 }}>
          {intl.formatMessage(messages.addSKUButton)}
        </Button>
      </ModalDisclosure>
      <Modal aria-label="SKU modal" state={modal} size="regular">
        <Formik initialValues={initialValue} onSubmit={handleSubmit}>
          <Form>
            <ModalHeader title="SKU" />
            <ModalContent>
              <Flex direction="column">
                <FormikInput name="skuId" label="SKU ID" />
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
                        name="minValue"
                        label={`${intl.formatMessage(messages.SKUItemMin)}`}
                      />
                    </Box>
                    <Box csx={{ width: '1/2' }}>
                      <Label csx={{ width: '100px', display: 'flex' }}>
                        {intl.formatMessage(messages.SKUItemMax)}
                      </Label>
                      <FormikNumericStepper
                        name="maxValue"
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
                    name="defaultValue"
                    label={`${intl.formatMessage(messages.SKUItemInitial)}`}
                  />
                </Box>
              </Flex>
            </ModalContent>
            <ModalFooter>
              <Flex justify="end">
                <ModalButton type="submit" closeModalOnClick>
                  {intl.formatMessage(messages.SKUItemConfirm)}
                </ModalButton>
              </Flex>
            </ModalFooter>
          </Form>
        </Formik>
      </Modal>
    </Box>
  )
}

export default SKUModal
