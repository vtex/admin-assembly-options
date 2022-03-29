import React from 'react'
import type { ModalStateReturn } from '@vtex/admin-ui'
import {
  IconX,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalButton,
  Box,
  Label,
  Flex,
  Heading,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'
import type { FormikHelpers } from 'formik'
import { Formik, Form } from 'formik'
import { FormikInput, FormikNumericStepper } from '@vtex/admin-formik'
import * as yup from 'yup'

import type { SKUType } from '../../context/RegisterContext'
import { messages } from '../../utils/messages'

interface Props {
  handleClose: (form: SKUType) => void
  modalState: ModalStateReturn
  initialValue?: SKUType
}

const SKUModal = (props: Props) => {
  const { handleClose, modalState, initialValue } = props
  const intl = useIntl()

  const defaultValue: SKUType = {
    skuId: '',
    priceTable: '',
    minValue: 0,
    maxValue: 0,
    defaultValue: 0,
  }

  const initialFormValue = initialValue ?? defaultValue

  const SchemaValidationError = yup.object({
    skuId: yup
      .string()
      .required(`${intl.formatMessage(messages.errorNameRequired)}`),
    priceTable: yup
      .string()
      .required(`${intl.formatMessage(messages.errorNameRequired)}`),
    minValue: yup
      .number()
      .integer()
      .required(`${intl.formatMessage(messages.errorNameRequired)}`),
    maxValue: yup
      .number()
      .integer()
      .required(`${intl.formatMessage(messages.errorNameRequired)}`)
      .when('minValue', (minValue: number) => {
        return yup
          .number()
          .integer()
          .min(
            minValue,
            `${intl.formatMessage(messages.errorNumberComparison)}`
          )
      }),

    defaultValue: yup
      .number()
      .integer()
      .required()
      .test(
        'min',
        'The Default Value is lower than the minimum value possible',
        (value: number | undefined, context) =>
          value !== undefined ? context.parent.minValue <= value : false
      )
      .test(
        'max',
        'The Default Value is higher than the maximum value possible',
        (value: number | undefined, context) =>
          value !== undefined ? context.parent.maxValue >= value : false
      ),
  })

  const handleSubmit = (values: SKUType, actions: FormikHelpers<SKUType>) => {
    const newSKU: SKUType = {
      skuId: values.skuId,
      priceTable: values.priceTable,
      minValue: values.minValue,
      maxValue: values.maxValue,
      defaultValue: values.defaultValue,
    }

    actions.resetForm()
    handleClose(newSKU)
  }

  return (
    <Box>
      <Modal
        aria-label="SKU-modal"
        state={modalState}
        size="regular"
        omitCloseButton
        hideOnEsc={false}
        hideOnClickOutside={false}
      >
        <Formik
          initialValues={initialFormValue}
          onSubmit={handleSubmit}
          validationSchema={SchemaValidationError}
          enableReinitialize
        >
          {({ isValid, dirty, resetForm }) => (
            <Form>
              <ModalHeader title="SKU">
                <ModalButton
                  variant="adaptative-dark"
                  closeModalOnClick
                  onClick={() => {
                    resetForm()
                  }}
                  icon={<IconX />}
                />
              </ModalHeader>
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
                  <ModalButton
                    type="submit"
                    closeModalOnClick={isValid && dirty}
                  >
                    {intl.formatMessage(messages.SKUItemConfirm)}
                  </ModalButton>
                </Flex>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    </Box>
  )
}

export default SKUModal
