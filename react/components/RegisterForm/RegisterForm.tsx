import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { Card, Heading, Paragraph, Flex, Box, Button } from '@vtex/admin-ui'
import { Formik } from 'formik'
import { FormikInput, FormikCheckbox } from '@vtex/admin-formik'

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
        <Card csx={{ marginTop: '15px' }}>
          <Heading>{intl.formatMessage(messages.assemblyFormTitle)}</Heading>
          <Paragraph>
            {intl.formatMessage(messages.assemblyFormDescription)}
          </Paragraph>
          <Flex as="section" direction="row" csx={{ marginTop: '20px' }}>
            <Box csx={{ width: '30%', paddingRight: 3 }}>
              <FormikInput
                name="assembly.name"
                label={intl.formatMessage(messages.assemblyNameLabel)}
              />
            </Box>
            <Box csx={{ width: '30%', paddingRight: 3 }}>
              <FormikInput name="assembly.id" label="ID" disabled />
            </Box>
            <Box csx={{ width: '30%' }}>
              <Flex direction="row" align="center" csx={{ height: '100%' }}>
                <Box csx={{ paddingRight: 3 }}>
                  <FormikCheckbox
                    name="assembly.active"
                    label={intl.formatMessage(messages.assemblyActive)}
                  />
                </Box>
                <Box>
                  <FormikCheckbox
                    name="assembly.required"
                    label={intl.formatMessage(messages.assemblyRequired)}
                  />
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Card>
        <Flex csx={{ margin: '10px 0px' }} justify="flex-end">
          <Button variant="secondary" onClick={handleAddKey}>
            {intl.formatMessage(messages.addKeyButton)}
          </Button>
        </Flex>
        <Flex direction="column">
          {keyQuantity.map((index: number) => {
            return <AssemblyKey key={index} />
          })}
        </Flex>
      </form>
    </Formik>
  )
}

export default RegisterForm
