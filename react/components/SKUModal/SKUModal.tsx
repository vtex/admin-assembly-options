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
} from '@vtex/admin-ui'
import { FormikInput, FormikNumericStepper } from '@vtex/admin-formik'

const SKUModal = () => {
  const modal = useModalState()

  return (
    <Box>
      <ModalDisclosure state={modal}>
        <Button variant="tertiary">Add New SKU</Button>
      </ModalDisclosure>
      <Modal aria-label="SKU modal" state={modal} size="small">
        <ModalHeader title="SKU" />
        <ModalContent>
          <FormikInput name="assembly.key.sku.id" label="SKU ID" />
          <FormikInput
            name="assembly.key.sku.priceTable"
            label="Price Table Name"
          />
          <Label>Minimum items applicable</Label>
          <FormikNumericStepper
            name="assembly.key.sku.minimum"
            label="Minimum items applicable"
          />
          <Label>Maximum items applicable</Label>
          <FormikNumericStepper
            name="assembly.key.sku.maximum"
            label="Maximum items applicable"
          />
          <Label>Initial items Quantity</Label>
          <FormikNumericStepper
            name="assembly.key.sku.initial"
            label="Initial Quantity"
          />
        </ModalContent>
        <ModalFooter>
          <Button>Confirm</Button>
        </ModalFooter>
      </Modal>
    </Box>
  )
}

export default SKUModal
