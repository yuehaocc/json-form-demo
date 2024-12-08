import React from 'react';
import { PlusOutlined, PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { Form, Input, Select } from 'antd';
import { dataTypeOptions, requiredOptions } from './CDemo';
import './index.less'
import type { FormInstance } from 'antd';

const MAX_LEVEL = 5;

const Index: React.FC<{
  existed: boolean;
  form: FormInstance;
  rowKey: string;
  prefixNamePath: (string | number)[];
}> = ({ existed, form, rowKey, prefixNamePath }) => {

  const add = () => {
    console.log('add prefixNamePath::', rowKey, prefixNamePath)
  }
  const addSub = () => {
    console.log('addSub prefixNamePath::', rowKey, prefixNamePath)
  }
  const remove = () => {
    console.log('remove prefixNamePath::', rowKey, prefixNamePath)
  }
  // 当前数据层级
  const level = rowKey.length;
  // 除了第一层，往下开始添加缩进
  const indentWidth = (level - 1) * 20;

  return (
    <div className="row">
      <div className="col">
        <div style={{ display: 'inline-block', width: `${indentWidth}px`, backgroundColor: 'orange' }}></div>
        <Form.Item style={{ display: 'inline-block', width: `calc(100% - ${indentWidth}px)` }} label="参数名" name={[...prefixNamePath, 'name']} rules={[{ required: true, message: "此项必填" }]}>
          <Input placeholder='请输入' disabled={existed} />
        </Form.Item>
      </div>
      <div className="col">
        <Form.Item label="参数类型" name={[...prefixNamePath, 'type']} rules={[{ required: true, message: "此项必填" }]}>
          <Select options={dataTypeOptions} placeholder='请选择' />
        </Form.Item>
      </div>
      <div className="col">
        <Form.Item label="是否必填" name={[...prefixNamePath, 'required']} rules={[{ required: true, message: "此项必填" }]}>
          <Select options={requiredOptions} placeholder='请选择' />
        </Form.Item>
      </div>
      <div className="col">
        <Form.Item label="参数值" name={[...prefixNamePath, 'value']}>
          <Input placeholder='请输入' />
        </Form.Item>
      </div>
      <div className="col col-operation">
        <PlusOutlined className="col-operation-item" onClick={() => {
          add()
        }} />

        {
          level === MAX_LEVEL ? null : (
            <PlusSquareOutlined className="col-operation-item" onClick={() => {
              addSub()
            }} />
          )
        }
        {
          existed ? null : (
            <DeleteOutlined className="col-operation-item" onClick={() => {
              remove()
            }} />
          )
        }
      </div>
    </div>
  );
};

export default Index;