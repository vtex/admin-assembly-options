import React, { useState } from 'react'
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
import { Formik } from 'formik'
import { FormikInput, FormikNumericStepper } from '@vtex/admin-formik'

import { useRegisterContext } from '../../context/RegisterContext'
import { messages } from '../../utils/messages'

interface Props {
  groupIndex: number
}

const SKUModal = (props: Props) => {
  const { group, setAssemblyGroup } = useRegisterContext()
  const { groupIndex } = props
  const intl = useIntl()
  const modal = useModalState()

  const [id, setId] = useState<string>('')
  const [priceTable, setPriceTable] = useState<string>('')
  const [minimum, setMinimum] = useState<number>(0)
  const [maximum, setMaximum] = useState<number>(0)
  const [initial, setInitial] = useState<number>(0)

  const initialValue = {
    id: 0,
    priceTable: '',
    minimum: 0,
    maximum: 0,
    initial: 0,
  }

  const newSKU = {
    id,
    priceTable,
    minimum,
    maximum,
    initial,
  }

  const handleAddSKU = () => {
    group[groupIndex].skus.push(newSKU)
    setAssemblyGroup([...group])
  }

  const handleSubmit = () => {
    /* eslint-disable no-alert */
    alert('Values submitted: ')
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
          <form>
            <ModalHeader title="SKU" />
            <ModalContent>
              <Flex direction="column">
                <FormikInput
                  name="id"
                  label="SKU ID"
                  onChange={(e) => setId(e.target.value)}
                />
                <FormikInput
                  name="priceTable"
                  label={`${intl.formatMessage(messages.SKUPriceTableLabel)}`}
                  onChange={(e) => setPriceTable(e.target.value)}
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
                        onChange={(e) => setMinimum(e.value)}
                      />
                    </Box>
                    <Box csx={{ width: '1/2' }}>
                      <Label csx={{ width: '100px', display: 'flex' }}>
                        {intl.formatMessage(messages.SKUItemMax)}
                      </Label>
                      <FormikNumericStepper
                        name="maximum"
                        label={`${intl.formatMessage(messages.SKUItemMax)}`}
                        onChange={(e) => setMaximum(e.value)}
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
                    onChange={(e) => setInitial(e.value)}
                  />
                </Box>
              </Flex>
            </ModalContent>
            <ModalFooter>
              <Flex justify="end">
                <ModalButton onClick={handleAddSKU} closeModalOnClick>
                  {intl.formatMessage(messages.SKUItemConfirm)}
                </ModalButton>
              </Flex>
            </ModalFooter>
          </form>
        </Formik>
      </Modal>
    </Box>
  )
}

export default SKUModal
