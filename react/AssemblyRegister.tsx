import React, { useState } from 'react'
import { Layout, PageHeader, PageBlock, Input, Checkbox } from 'vtex.styleguide'

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
      <form className="">
        <PageBlock>
          <h3 className="f5 mb2">Main Config</h3>
          <p className="f6 gray pb4 mb3">
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
                label="ID"
              />
            </div>
          </div>
          <div className="flex mv6 items-center ">
            <div className="mr3 w-50">
              <Input
                placeholder="Minimum items applied"
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="Minimum Integer Number"
              />
            </div>
            <div className="w-50">
              <Input
                placeholder="Maximum items applied"
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="Maximum Integer Number"
              />
            </div>
          </div>
          <div className="flex mv6 items-center ">
            <Checkbox
              checked={active}
              id="option-0"
              label="Active"
              name="default-checkbox-group"
              onChange={() => setActive(!active)}
              value="option-0"
            />
            <Checkbox
              checked={required}
              id="option-0"
              s
              label="Required"
              name="default-checkbox-group"
              onChange={() => setRequired(!required)}
              value="option-0"
            />
          </div>
        </PageBlock>
      </form>
    </Layout>
  )
}

export default AssemblyRegister
