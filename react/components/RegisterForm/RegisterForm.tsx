import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { Card, Heading, Flex, Button } from '@vtex/admin-ui'
import type { FormikProps } from 'formik'
import { Formik } from 'formik'
import { FormikInput, FormikCheckbox, FormikToggle } from '@vtex/admin-formik'
import * as yup from 'yup'
import uniqid from 'uniqid'
import type { AssemblyOption } from 'vtex.assembly-options-graphql'
import useDidMount from '@rooks/use-did-mount'

import type { AssemblyGroupType } from '../../context/RegisterContext'
import { useRegisterContext } from '../../context/RegisterContext'
import AssemblyGroup from '../AssemblyGroup'
import { messages } from '../../utils/messages'
import { useGroupFormContext } from '../../context/GroupFormContext'

interface Props {
  assemblyOption?: AssemblyOption
}

interface FormValues {
  name: string
  active: boolean
  required: boolean
}

export interface RegisterFormHandle {
  handleSubmit: () => Promise<void>
  validateForm: () => boolean
}

const RegisterForm = forwardRef<RegisterFormHandle, Props>(
  ({ assemblyOption }, ref) => {
    const {
      group,
      setAssemblyActive,
      setAssemblyRequired,
      setAssemblyName,
      setAssemblyGroup,
    } = useRegisterContext()

    const { submitForms, validateForms } = useGroupFormContext()

    const intl = useIntl()

    const [initialValues, setInitialValues] = useState({
      name: '',
      active: true,
      required: false,
    })

    const formRef = useRef<FormikProps<FormValues>>(null)

    useImperativeHandle(ref, () => ({
      async handleSubmit() {
        await Promise.all([formRef.current?.submitForm(), submitForms()])
      },
      validateForm() {
        return (formRef.current?.isValid && validateForms()) ?? true
      },
    }))

    const handleSubmit = ({ name, active, required }: FormValues) => {
      setAssemblyName(name)
      setAssemblyActive(active)
      setAssemblyRequired(required)
    }

    const SchemaValidationError = yup.object().shape({
      name: yup
        .string()
        .required(intl.formatMessage(messages.errorNameRequired)),
    })

    const handleAddGroup = () => {
      const emptyGroup: AssemblyGroupType = {
        key: uniqid(),
        name: '',
        minItems: 0,
        maxItems: 0,
        items: [],
      }

      setAssemblyGroup((previews) => [...previews, emptyGroup])
    }

    useDidMount(() => {
      if (!assemblyOption) return

      const { name, isActive, isRequired, configs } = assemblyOption

      setInitialValues({
        name,
        active: isActive,
        required: isRequired,
      })

      setAssemblyGroup(
        configs.map((config) => {
          const { name: configName, minItems, maxItems, items } = config

          return {
            key: uniqid(),
            name: configName,
            minItems,
            maxItems,
            items,
          } as AssemblyGroupType
        })
      )
    })

    return (
      <>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ ...initialValues }}
          validationSchema={SchemaValidationError}
          innerRef={formRef}
          enableReinitialize
        >
          <form>
            <Card csx={{ maxWidth: '712px', margin: '15px auto' }}>
              <Heading>
                {intl.formatMessage(messages.assemblyFormTitle)}
              </Heading>
              <Flex direction="column" csx={{ marginTop: '20px' }}>
                <FormikInput
                  name="name"
                  label={intl.formatMessage(messages.assemblyNameLabel)}
                />
                <FormikToggle
                  csx={{ margin: '5px 0px' }}
                  name="active"
                  label={intl.formatMessage(messages.assemblyActive)}
                />
                <FormikCheckbox
                  csx={{ margin: '5px 0px' }}
                  name="required"
                  label={intl.formatMessage(messages.assemblyRequired)}
                />
              </Flex>
            </Card>
          </form>
        </Formik>
        <Flex direction="column">
          <Card csx={{ maxWidth: '712px', width: '100%', margin: '15px auto' }}>
            <Flex direction="row" justify="space-between" align="center">
              <Heading>
                {intl.formatMessage(messages.assemblyGroupsTitle)}
              </Heading>
              <Button variant="secondary" onClick={handleAddGroup}>
                {intl.formatMessage(messages.addKeyButton)}
              </Button>
            </Flex>
            <Flex direction="column">
              {group.map((value, index) => (
                <AssemblyGroup
                  key={`assembly-group-${value.key}`}
                  groupIndex={index}
                  groupValue={value}
                />
              ))}
            </Flex>
            {group.length > 1 ? (
              <Flex direction="row" justify="end" csx={{ marginTop: '20px' }}>
                <Button variant="secondary" onClick={handleAddGroup}>
                  {intl.formatMessage(messages.addKeyButton)}
                </Button>
              </Flex>
            ) : null}
          </Card>
        </Flex>
      </>
    )
  }
)

export default RegisterForm
