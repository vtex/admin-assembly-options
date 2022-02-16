/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { Card, Heading, Flex, Button } from '@vtex/admin-ui'
import { Formik } from 'formik'
import { FormikInput, FormikCheckbox, FormikToggle } from '@vtex/admin-formik'

import AssemblyKey from '../AssemblyKey'
import { messages } from '../../utils/messages'

const RegisterForm = () => {
  const [keyQuantity, setKeyQuantity] = useState<number[]>([])
  const intl = useIntl()
  const handleSubmit = () => {
    /* eslint-disable no-alert */
    alert('Values submitted: ')
  }

  const handleAddKey = () => {
    const test = 0

    setKeyQuantity([...[test]])
    // eslint-disable-next-line no-console
    console.log(keyQuantity)
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        assembly: {
          name: '',
          id: '',
          active: false,
          required: false,
          key: {
            name: '',
            minimum: 0,
            maximum: 0,
            sku: {
              id: 0,
              priceTable: '',
              minimum: 0,
              maximum: 0,
              initial: 0,
            },
          },
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
            />
            <FormikToggle
              csx={{ margin: '5px 0px' }}
              name="assembly.active"
              label={intl.formatMessage(messages.assemblyActive)}
            />
            <FormikCheckbox
              csx={{ margin: '5px 0px' }}
              name="assembly.required"
              label={intl.formatMessage(messages.assemblyRequired)}
            />
          </Flex>
        </Card>
        <Flex direction="column">
          <Card csx={{ width: '712px', margin: '15px auto' }}>
            <Flex direction="row" justify="space-between" align="center">
              <Heading>
                {intl.formatMessage(messages.assemblyGroupsTitle)}
              </Heading>
              <Button variant="secondary" onClick={handleAddKey}>
                {intl.formatMessage(messages.addKeyButton)}
              </Button>
            </Flex>
            {keyQuantity.map((index: number) => {
              return <AssemblyKey key={index} />
            })}
          </Card>
        </Flex>
      </form>
    </Formik>
  )
}

export default RegisterForm
