import React from 'react'
import {
  Collapsible,
  CollapsibleHeader,
  CollapsibleContent,
  useCollapsibleState,
  Flex,
  Box,
  Label,
  Button,
  ModalDisclosure,
  useModalState,
  Tooltip,
  IconWarning,
} from '@vtex/admin-ui'
import { Formik, Form } from 'formik'
import { FormikInput, FormikNumericStepper } from '@vtex/admin-formik'
import { useIntl } from 'react-intl'
import * as yup from 'yup'

import SKUModal from '../SKUModal'
import SKUGrid from '../SKUGrid'
import { messages } from '../../utils/messages'
import type { SKUType } from '../../context/RegisterContext'
import { useRegisterContext } from '../../context/RegisterContext'

interface Props {
  groupIndex: number
}

interface GroupType {
  name: string
  minItems: number
  maxItems: number
}

const AssemblyGroup = (props: Props) => {
  const state = useCollapsibleState({ visible: true })
  const { visible } = state
  const intl = useIntl()
  const { group, setAssemblyGroup } = useRegisterContext()
  const { groupIndex } = props
  const modal = useModalState()

  const initialValueSKU: SKUType = {
    skuId: '',
    priceTable: '',
    minValue: 0,
    maxValue: 0,
    defaultValue: 0,
  }

  const initialValues = {
    name: group[groupIndex].name || '',
    minItems: group[groupIndex].minItems || 0,
    maxItems: group[groupIndex].maxItems || 0,
  }

  const SchemaValidationError = yup.object().shape({
    name: yup
      .string()
      .required(`${intl.formatMessage(messages.errorNameRequired)}`),
    minItems: yup
      .number()
      .integer()
      .required(`${intl.formatMessage(messages.errorNameRequired)}`),
    maxItems: yup
      .number()
      .integer()
      .required(`${intl.formatMessage(messages.errorNameRequired)}`)
      .when('minItems', (minItems: number) => {
        return yup
          .number()
          .min(
            minItems,
            `${intl.formatMessage(messages.errorNumberComparison)}`
          )
          .required()
      }),
  })

  const handleClose = (form: SKUType) => {
    group[groupIndex].items.push(form)
    setAssemblyGroup([...group])
  }

  const handleSubmit = (values: GroupType) => {
    // eslint-disable-next-line no-console
    console.log(values)
  }

  // const handleDelete = () => {
  //   const newGroup = [...group]

  //   newGroup.splice(groupIndex, 1)
  //   setAssemblyGroup(newGroup)
  //   // eslint-disable-next-line no-console
  //   console.log(groupIndex, newGroup)
  // }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SchemaValidationError}
    >
      {({ values, isValid, dirty, submitForm }) => (
        <Form>
          <Collapsible csx={{ width: '100%', marginTop: '20px' }} state={state}>
            <CollapsibleHeader
              csx={{ padding: '10px 0px' }}
              label={
                values.name
                  ? `${values.name}`
                  : `${intl.formatMessage(messages.unamedGroup)}`
              }
            >
              {(dirty && isValid === false) ||
              (dirty === false && visible === false) ? (
                <Tooltip
                  label="Esse grupo precisa de ajustes"
                  placement="right"
                >
                  <Button
                    icon={<IconWarning csx={{ color: '#CC3E3E' }} />}
                    variant="tertiary"
                  />
                </Tooltip>
              ) : null}
              <Button
                onClick={async () => {
                  const batata = await submitForm()

                  // eslint-disable-next-line no-console
                  console.log(`BATATA${batata} and ISVALID${isValid}`)
                }}
              >
                oi
              </Button>
            </CollapsibleHeader>

            <CollapsibleContent>
              <Flex direction="column" justify="space-between">
                <Flex direction="column">
                  <FormikInput
                    id="name"
                    name="name"
                    label={`${intl.formatMessage(messages.keyNameLabel)}`}
                    csx={{ margin: '0px' }}
                    onChange={(e) => {
                      group[groupIndex].name = e.target.value
                      setAssemblyGroup([...group])
                    }}
                  />
                  <Flex csx={{ paddingRight: 3 }}>
                    <Box csx={{ width: '1/2', paddingRight: 2, marginTop: 3 }}>
                      <Label csx={{ width: '100%' }}>
                        {intl.formatMessage(messages.keyMinimumLabel)}
                      </Label>
                      <FormikNumericStepper
                        name="minItems"
                        label="Minimum Items"
                        minValue={0}
                        onChange={(e) => {
                          group[groupIndex].minItems = e.value
                          setAssemblyGroup([...group])
                        }}
                      />
                    </Box>
                    <Box csx={{ width: '1/2', marginTop: 3 }}>
                      <Label csx={{ width: '100%' }}>
                        {intl.formatMessage(messages.keyMaximumLabel)}
                      </Label>
                      <FormikNumericStepper
                        name="maxItems"
                        label="Maximum Items"
                        minValue={values.minItems}
                        onChange={(e) => {
                          group[groupIndex].maxItems = e.value
                          setAssemblyGroup([...group])
                        }}
                      />
                    </Box>
                  </Flex>
                </Flex>
              </Flex>

              <Flex csx={{ marginTop: 5 }}>
                <SKUGrid groupIndex={groupIndex} />
              </Flex>
              <Flex>
                <Box>
                  <ModalDisclosure state={modal}>
                    <Button variant="tertiary" csx={{ marginTop: 3 }}>
                      {intl.formatMessage(messages.addSKUButton)}
                    </Button>
                  </ModalDisclosure>
                  <SKUModal
                    handleClose={handleClose}
                    modalState={modal}
                    initialSKU={initialValueSKU}
                  />
                </Box>
              </Flex>
            </CollapsibleContent>
          </Collapsible>
        </Form>
      )}
    </Formik>
  )
}

export default AssemblyGroup
