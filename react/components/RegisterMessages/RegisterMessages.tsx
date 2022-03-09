import { Alert, IconXOctagon, List } from '@vtex/admin-ui'
import React from 'react'
import type { AssemblyOption } from 'vtexbr.assembly-options-graphql'
import { FormattedMessage, useIntl } from 'react-intl'

import { messages } from '../../utils/messages'

interface Props {
  data: AssemblyOption | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any | undefined
  loading: boolean | undefined
}

interface ErrorType {
  code: string
  message: string
  configName: string
  skuId: string
}

const RegisterMessages = (props: Props) => {
  const { data, error, loading } = props
  const intl = useIntl()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorMessages: any = {
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

  if (loading === true) {
    return (
      <Alert
        visible
        tone="warning"
        csx={{
          display: 'flex important',
          height: 'fit-content !important',
          marginTop: '20px',
        }}
      >
        Loading ...
      </Alert>
    )
  }

  if (error) {
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
          {errorsGraphQL.map((value: ErrorType, index: number) => {
            const codeValue = value.code || ''
            const skuId = value.skuId || ''
            const configName = value.configName || ''

            return (
              <List.Item
                key={index}
                csx={{ alignItems: 'center', display: 'flex' }}
              >
                <IconXOctagon csx={{ marginRight: '3px', color: '#CC3E3E' }} />
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

  return <> </>
}

export default RegisterMessages
