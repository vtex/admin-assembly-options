import { Alert, IconXOctagon, List } from '@vtex/admin-ui'
import React from 'react'
import type { AssemblyOption } from 'vtexbr.assembly-options-graphql'
import { FormattedMessage, useIntl } from 'react-intl'

import { messages } from '../../utils/messages'

interface Extensions {
  exception: {
    graphQLErrors: ErrorType[]
    response: {
      status: number
    }
  }
}

interface ApolloError {
  graphQLErrors: Array<{
    extensions: Extensions
  }>
}

interface Props {
  data: AssemblyOption | null | undefined
  error?: ApolloError
}

interface ErrorType {
  code: ErrorKeys
  message: string
  configName: string
  skuId?: string
}

type ErrorKeys =
  | 'configIncreasingValueRange'
  | 'skuDefaultValueRangeValidate'
  | 'skuDefaultValueValidate'
  | 'skuIncreasingValueRange'
  | 'skuMaxQuantityValidate'
  | 'skuQuantityOutOfAssemblyOptionRange'
  | 'skuSumDefaultValueValidate'
  | 'uniqueKeyValidate'

const RegisterMessages = (props: Props) => {
  const { data, error } = props
  const intl = useIntl()
  const errorMessages: { [key in ErrorKeys]: string } = {
    configIncreasingValueRange:
      'admin/assembly.register.error-config-value-range',
    skuDefaultValueRangeValidate:
      'admin/assembly.register.error-sku-value-range',
    skuDefaultValueValidate: 'admin/assembly.register.error-sku-value',
    skuIncreasingValueRange:
      'admin/assembly.register.error-sku-increasing-value',
    skuMaxQuantityValidate: 'admin/assembly.register.error-sku-max-value',
    skuQuantityOutOfAssemblyOptionRange:
      'admin/assembly.register.error-sku-range-assembly',
    skuSumDefaultValueValidate:
      'admin/assembly.register.error-sku-range-assembly-default',
    uniqueKeyValidate: 'admin/assembly.register.error-unique-key',
  }

  if (error) {
    if (error.graphQLErrors[0].extensions.exception.graphQLErrors) {
      const errorsGraphQL =
        error.graphQLErrors[0].extensions.exception.graphQLErrors

      return (
        <Alert
          visible
          tone="critical"
          csx={{
            display: 'flex important',
            height: 'fit-content !important',
            marginTop: '20px',
          }}
        >
          <List csx={{ listStyle: 'none' }}>
            {errorsGraphQL.map((value, index: number) => {
              const codeValue = value.code || ''
              const skuId = value.skuId ?? ''
              const configName = value.configName || ''

              return (
                <List.Item
                  key={index}
                  csx={{ alignItems: 'center', display: 'flex' }}
                >
                  <IconXOctagon
                    csx={{ marginRight: '3px', color: '#CC3E3E' }}
                  />
                  <FormattedMessage
                    id={errorMessages[codeValue]}
                    values={{
                      configName,
                      skuId,
                    }}
                  />
                </List.Item>
              )
            })}
          </List>
        </Alert>
      )
    }

    if (error.graphQLErrors[0].extensions.exception.response.status === 409) {
      return (
        <Alert
          visible
          tone="critical"
          csx={{
            display: 'flex important',
            height: 'fit-content !important',
            marginTop: '20px',
          }}
        >
          {intl.formatMessage(messages.nameAlreadyExist)}
        </Alert>
      )
    }

    return (
      <Alert
        visible
        tone="critical"
        csx={{
          display: 'flex important',
          height: 'fit-content !important',
          marginTop: '20px',
        }}
      >
        {intl.formatMessage(messages.formWithError)}
      </Alert>
    )
  }

  if (data) {
    return (
      <Alert
        visible
        tone="positive"
        csx={{
          display: 'flex important',
          height: 'fit-content !important',
          marginTop: '20px',
        }}
      >
        {intl.formatMessage(messages.assemblygraphQLSuccess)}
      </Alert>
    )
  }

  return null
}

export default RegisterMessages
