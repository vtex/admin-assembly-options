import React from 'react'
import { useIntl } from 'react-intl'
import { Card, Heading, Flex, Button } from '@vtex/admin-ui'
import { Formik } from 'formik'
import { FormikInput, FormikCheckbox, FormikToggle } from '@vtex/admin-formik'

import type { AssemblyGroupType } from '../../context/RegisterContext'
import { useRegisterContext } from '../../context/RegisterContext'
import AssemblyGroup from '../AssemblyGroup'
import { messages } from '../../utils/messages'

const RegisterForm = () => {
  const {
    active,
    required,
    group,
    setAssemblyActive,
    setAssemblyRequired,
    setAssemblyName,
    setAssemblyGroup,
  } = useRegisterContext()

  const intl = useIntl()
  const handleSubmit = () => {
    /* eslint-disable no-alert */
    alert('Values submitted: ')
  }

  const handleAddGroup = () => {
    const emptyGroup: AssemblyGroupType = {
      name: '',
      maxItems: 0,
      minItems: 0,
      items: [],
    }

    const newArray = [...group, emptyGroup]

    setAssemblyGroup(newArray)
  }

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          assembly: {
            name: '',
            id: '',
            active: false,
            required: false,
          },
        }}
      >
        <form>
          <Card csx={{ width: '712px', margin: '15px auto' }}>
            <Heading>{intl.formatMessage(messages.assemblyFormTitle)}</Heading>
            <Flex direction="column" csx={{ marginTop: '20px' }}>
              <FormikInput
                name="assembly.name"
                label={intl.formatMessage(messages.assemblyNameLabel)}
                onChange={(e) => {
                  setAssemblyName(e.target.value)
                }}
              />
              <FormikToggle
                csx={{ margin: '5px 0px' }}
                name="assembly.active"
                label={intl.formatMessage(messages.assemblyActive)}
                onClick={() => setAssemblyActive(!active)}
              />
              <FormikCheckbox
                csx={{ margin: '5px 0px' }}
                name="assembly.required"
                label={intl.formatMessage(messages.assemblyRequired)}
                onClick={() => setAssemblyRequired(!required)}
              />
            </Flex>
          </Card>
        </form>
      </Formik>
      <Flex direction="column">
        <Card csx={{ width: '712px', margin: '15px auto' }}>
          <Flex direction="row" justify="space-between" align="center">
            <Heading>
              {intl.formatMessage(messages.assemblyGroupsTitle)}
            </Heading>
            <Button variant="secondary" onClick={handleAddGroup}>
              {intl.formatMessage(messages.addKeyButton)}
            </Button>
          </Flex>
          <Flex direction="column">
            {group.map((_value, index) => {
              return <AssemblyGroup key={index} groupIndex={index} />
            })}
          </Flex>
        </Card>
      </Flex>
    </>
  )
}

export default RegisterForm
