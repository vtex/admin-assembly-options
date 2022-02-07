/* eslint-disable no-alert */
import React from 'react'
import { useIntl } from 'react-intl'
import { Card, Heading, Paragraph, Flex, Box, Button } from '@vtex/admin-ui'
import { Formik } from 'formik'
import { FormikInput, FormikCheckbox } from '@vtex/admin-formik'

import KeyRegister from '../KeyRegister'
import { messages } from '../../utils/messages'

const RegisterForm = () => {
  const intl = useIntl()
  const handleSubmit = () => {
    alert('Values submitted: ')
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
          <Button variant="secondary">ADD NEW KEY</Button>
        </Flex>
        <Flex>
          <KeyRegister />
        </Flex>
      </form>
    </Formik>
  )
}

export default RegisterForm
