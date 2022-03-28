import React, { useState } from 'react'
import {
  Collapsible,
  CollapsibleHeader,
  CollapsibleContent,
  useCollapsibleState,
  Flex,
  Box,
  Label,
  Button,
} from '@vtex/admin-ui'
import { Formik } from 'formik'
import { FormikInput, FormikNumericStepper } from '@vtex/admin-formik'
import { useIntl } from 'react-intl'

import SKUModal from '../SKUModal'
import SKUGrid from '../SKUGrid'
import { messages } from '../../utils/messages'
import type { SKUType } from '../../context/RegisterContext'
import { useRegisterContext } from '../../context/RegisterContext'

interface Props {
  groupIndex: number
}

const AssemblyGroup = (props: Props) => {
  const state = useCollapsibleState()
  const intl = useIntl()
  const [groupName, setGroupName] = useState<string>('')
  const [groupMinimum, setGroupMinimum] = useState<number>(0)
  const [groupMaximum, setGroupMaximum] = useState<number>(0)
  const { group, setAssemblyGroup } = useRegisterContext()
  const { groupIndex } = props

  const handleInfo = () => {
    group[groupIndex].name = groupName
    group[groupIndex].minItems = groupMinimum
    group[groupIndex].maxItems = groupMaximum
    setAssemblyGroup(group)
  }

  const initialValues = {
    name: '',
    minItems: 0,
    maxItems: 0,
  }

  const handleSubmit = () => {
    /* eslint-disable no-alert */
    alert('Values submitted: ')
  }

  const handleClose = (form: SKUType) => {
    group[groupIndex].items.push(form)
    setAssemblyGroup([...group])
  }

  return (
    <Collapsible
      csx={{ width: '100%', marginTop: '20px' }}
      state={state}
      disabled={false}
    >
      <CollapsibleHeader
        csx={{ padding: '10px 0px' }}
        label={`${intl.formatMessage(messages.keyName)} ${groupName}`}
      >
        <Button
          variant="secondary"
          onClick={handleInfo}
          csx={{ marginRight: 3 }}
        >
          Save Group
        </Button>
      </CollapsibleHeader>
      <CollapsibleContent>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <form>
            <Flex direction="column" justify="space-between">
              <Flex direction="column">
                <FormikInput
                  id="name"
                  name="name"
                  label={`${intl.formatMessage(messages.keyNameLabel)}`}
                  csx={{ margin: '0px' }}
                  onChange={(e) => setGroupName(e.target.value)}
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
                      onChange={(e) => setGroupMinimum(e.value)}
                    />
                  </Box>
                  <Box csx={{ width: '1/2', marginTop: 3 }}>
                    <Label csx={{ width: '100%' }}>
                      {intl.formatMessage(messages.keyMaximumLabel)}
                    </Label>
                    <FormikNumericStepper
                      name="maxItems"
                      label="Maximum Items"
                      minValue={groupMinimum}
                      onChange={(e) => setGroupMaximum(e.value)}
                    />
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </form>
        </Formik>
        <Flex csx={{ marginTop: 5 }}>
          <SKUGrid groupIndex={groupIndex} />
        </Flex>
        <Flex>
          <Box>
            <SKUModal handleClose={handleClose} />
          </Box>
        </Flex>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default AssemblyGroup
