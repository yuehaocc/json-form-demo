import React, { useMemo, useState } from 'react';
import { Item, itemTemplate } from './CDemo';
import TreeFormRow from './TreeFormRow';
import './index.less'
import { Button } from 'antd';
import type { FormInstance } from 'antd';

const Index: React.FC<{
  form: FormInstance;
  data: Item[];
  filedName: string;
}> = ({ form, data, filedName }) => {
  // 本地化初始数据，之后在此基础上增删
  const [localData, setLocalData] = useState<Item[]>(data);

  const createFormItemsTree = useMemo(() => {

    if (localData?.length) {
      const loop = (list: Item[], prevKey: string | undefined, prefixNamePath: (string | number)[]): React.ReactNode => {
        return (
          <>
            {
              list.map((item, index) => {
                const currentPrefixNamePath = [...prefixNamePath, index];
                const currentKey = `${prevKey || ''}${index}`;
                // 判断是否是存量数据 存量数据不允许修改参数名和删除
                const existed = !!item?.name
                return (
                  <div key={currentKey}>
                    <TreeFormRow existed={existed} form={form} rowKey={currentKey} prefixNamePath={currentPrefixNamePath} />
                    {
                      item?.children?.length ? loop(item.children, currentKey, [...currentPrefixNamePath, 'children']) : null
                    }
                  </div>
                )
              })
            }

          </>
        )
      };

      return loop(localData, undefined, [filedName])
    }

    return (
      <Button type="dashed" onClick={() => {
        setLocalData([itemTemplate])
      }} block>
        + 新增一行
      </Button>
    )

  }, [form, localData, filedName])

  return (
    <>
      {createFormItemsTree}
    </>

  );
};

export default Index;