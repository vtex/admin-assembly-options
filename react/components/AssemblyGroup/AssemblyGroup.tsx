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
  IconTrash,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  useMenuState,
} from '@vtex/admin-ui'
import type { FormikProps } from 'formik'
import { Formik, Form } from 'formik'
import { FormikInput, FormikNumericStepper } from '@vtex/admin-formik'
import { useIntl } from 'react-intl'
import * as yup from 'yup'
import useDidMount from '@rooks/use-did-mount'
import useWillUnmount from '@rooks/use-will-unmount'

import SKUModal from '../SKUModal'
import SKUGrid from '../SKUGrid'
import { messages } from '../../utils/messages'
import type { AssemblyGroupType, SKUType } from '../../context/RegisterContext'
import { useRegisterContext } from '../../context/RegisterContext'
import { useGroupFormContext } from '../../context/GroupFormContext'

interface Props {
  groupIndex: number
  groupValue: AssemblyGroupType
}

interface GroupType {
  name: string
  minItems: number
  maxItems: number
}

interface FormValuesType {
  name: string
  minItems: number
  maxItems: number
}

const AssemblyGroup = (props: Props) => {
  const state = useCollapsibleState({ visible: true })
  const intl = useIntl()
  const { groupIndex, groupValue } = props
  const { group, setAssemblyGroup } = useRegisterContext()
  const { addFormRef, removeFormRef } = useGroupFormContext()
  const menuState = useMenuState()

  const modal = useModalState()

  const formRef = React.useRef<FormikProps<FormValuesType>>(null)

  const initialValues: FormValuesType = {
    name: groupValue.name || '',
    minItems: groupValue.minItems || 0,
    maxItems: groupValue.maxItems || 0,
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
    group[groupIndex] = { ...group[groupIndex], ...values }
    setAssemblyGroup([...group])
  }

  const handleDelete = () => {
    setAssemblyGroup((previews) => {
      const newGroup = [...previews]

      newGroup.splice(groupIndex, 1)

      return newGroup
    })
  }

  useDidMount(() => {
    addFormRef<FormValuesType>(formRef)
  })

  useWillUnmount(() => {
    removeFormRef<FormValuesType>(formRef)
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SchemaValidationError}
      enableReinitialize
      innerRef={formRef}
    >
      {({ values }) => (
        <Form>
          <Collapsible csx={{ width: '100%', marginTop: '20px' }} state={state}>
            <CollapsibleHeader
              csx={{ padding: '10px 15px' }}
              label={
                values.name
                  ? `${values.name}`
                  : `${intl.formatMessage(messages.unamedGroup)}`
              }
            >
              <Menu state={menuState} hideOnClick>
                <MenuButton display="actions" variant="tertiary" />
                <MenuList aria-label="actions" state={state}>
                  <MenuItem
                    onClick={handleDelete}
                    icon={<IconTrash />}
                    csx={{ color: '#CC3E3E' }}
                  >
                    {intl.formatMessage(messages.deleteAction)}
                  </MenuItem>
                </MenuList>
              </Menu>
            </CollapsibleHeader>

            <CollapsibleContent>
              <Flex direction="column" justify="space-between">
                <Flex direction="column">
                  <FormikInput
                    id={`assembly-group-name-${groupIndex}`}
                    name="name"
                    label={`${intl.formatMessage(messages.keyNameLabel)}`}
                    helperText={intl.formatMessage(messages.keyNameLabelHelper)}
                    csx={{ margin: '0px' }}
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
                      />
                    </Box>
                    <Box csx={{ width: '1/2', marginTop: 3 }}>
                      <Label csx={{ width: '100%' }}>
                        {intl.formatMessage(messages.keyMaximumLabel)}
                      </Label>
                      <FormikNumericStepper
                        name="maxItems"
                        label="Maximum Items"
                        minValue={0}
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
                  <SKUModal handleClose={handleClose} modalState={modal} />
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
