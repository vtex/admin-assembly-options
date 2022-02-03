import React, { useState } from 'react'
import { Layout, PageHeader, PageBlock, Input, Checkbox } from 'vtex.styleguide'

import SKUConfig from './Components/SKUConfig'

const AssemblyRegister = () => {
  const [required, setRequired] = useState(false)
  const [active, setActive] = useState(false)

  return (
    <Layout
      pageHeader={
        <PageHeader
          title="Assembly Register"
          linkLabel="Assembly Options"
          onLinkClick={() => {
            alert('Voltar')
          }}
        />
      }
    >
      <form>
        <PageBlock>
          <h3 className="f5 mb2">Main Config</h3>
          <p className="f6 gray pb4 mb2">
            Main information related to the entire Assembly Options
          </p>
          <div className="flex mv6 items-center mb2">
            <div className="mr3 w-50">
              <Input
                placeholder="Name for the Assembly Options"
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="Name"
              />
            </div>
            <div className="w-50">
              <Input
                placeholder="ID"
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                git
                poush
                label="ID"
                type="number"
                disabled
              />
            </div>
          </div>
          <div className="flex mv6 items-center ">
            <div className="mr3 w-50">
              <Input
                placeholder="Minimum Integer Number"
                label="Minimum items applied "
                type="number"
                min="0"
              />
            </div>
            <div className="w-50">
              <Input
                placeholder="Maximum Integer Number"
                label="Maximum items applied "
                type="number"
                min="0"
              />
            </div>
          </div>
          <div className="flex mv6 items-center ">
            <Checkbox
              checked={active}
              id="is-active"
              label="Active"
              name="default-checkbox-group"
              onChange={() => setActive(!active)}
              value="is-active"
            />
            <Checkbox
              checked={required}
              id="is-required"
              className="mr5"
              label="Required"
              name="default-checkbox-group"
              onChange={() => setRequired(!required)}
              value="is-required"
            />
          </div>
        </PageBlock>
        <PageBlock>
          <h3 className="f5 mb2">Assembly Items</h3>
          <SKUConfig />
          <SKUConfig />
        </PageBlock>
      </form>
    </Layout>
  )
}

export default AssemblyRegister
