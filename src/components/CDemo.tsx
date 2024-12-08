import React, { useEffect, useState } from 'react';
import { Button, Form, Typography } from 'antd';


import TreeFormItems from './TreeFormItems';

const dataTypeArr = ['string', 'number', 'boolean', 'array', 'object',] as const;

type DataType = typeof dataTypeArr[number]

export const dataTypeOptions = dataTypeArr.map(item => ({
  label: item,
  value: item
}))

export const requiredOptions = [
  {
    label: '是',
    value: true
  },
  {
    label: '否',
    value: false
  }
]

export interface Item {
  name: string | null;
  type: DataType | null;
  required: boolean;
  value?: string;
  children?: Item[]
}

export const itemTemplate: Item = {
  name: null,
  type: null,
  required: false,
  value: undefined,
  children: undefined
}

const bodyFiledName = 'bodyParamsTree'

const App: React.FC = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState<{
    bodyParamsTree: Item[];
  }>({
    // bodyParamsTree: [],
    bodyParamsTree: [{
      name: "1", type: "string", required: true, children: [{
        name: "1-1", type: "string", required: !true, children: [
          {
            name: "1-1-1", type: "string", required: true, children: [{
              name: "1-1-1-1", type: "string", required: !true, children: [
                {
                  name: "1-1-1-1-1", type: "string", required: true, children: []
                },
                {
                  name: "1-1-1-1-2", type: "string", required: true, children: []
                },
                {
                  name: "1-1-1-1-3", type: "string", required: true, children: []
                },
              ]
            }]
          }
        ]
      }]
    }]
  });

  useEffect(() => {
    form.setFieldsValue(data)
  }, [form, data])

  return (
    <Form
      form={form}
      name="dynamic_form_complex"
      // style={{ maxWidth: 800 }}
      autoComplete="off"
      // initialValues={}
      layout='vertical'
    >

      <TreeFormItems form={form} data={data[bodyFiledName]} filedName={bodyFiledName} />

      <Button type="primary" onClick={() => {
        form.validateFields().then(values => {
          console.log('validateFields values::', values)
        })
      }} block>
        submit
      </Button>

      <Form.Item shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
};

export default App;