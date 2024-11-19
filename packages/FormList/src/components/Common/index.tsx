import React, { useEffect, useMemo, useRef, Suspense } from "react";
import { Button, Form, Spin } from "antd";
import { addUtil } from "@src/common/util";
import type { IFormListProps } from "@src/types";
import type { ButtonProps, FormItemProps, FormListOperation } from "antd";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import FormListItem from "./ControlItem/formListItem";
import { AddButtonComponent } from "./AddButton";
import { RemoveButtonComponent } from "./RemoveButton";
import { MoveButtonComponent } from "./MoveButton";

// const FormListItem = React.lazy(() => import("./ControlItem/formListItem"));

// const VirtualList = ({ fields, rowHeight = 50, ListItem }: any) => {
//   const listRef = useRef<any>(null);
//   const rowHeights = useRef<any>(null);

//   const getRowHeight = (index: number) => {
//     return rowHeights.current?.[index] || rowHeight;
//   };
//   const setRowHeight = (index: number, size: number) => {
//     rowHeights.current = { ...(rowHeights.current || {}), [index]: size };
//     listRef.current.resetAfterIndex(0);
//   };

//   return (
//     <AutoSizer>
//       {({ width, height, ...restProps }) => {
//         return (
//           <List
//             ref={listRef}
//             height={height}
//             width={width}
//             itemCount={(fields || []).length}
//             itemData={fields}
//             itemSize={getRowHeight}
//           >
//             {({ index, data, ...restProps }) => {
//               return (
//                 <AutoSizer>
//                   {({ width, height, ...restProps }) => {
//                     return (
//                       <List
//                         ref={listRef}
//                         height={height}
//                         width={width}
//                         itemCount={(fields || []).length}
//                         itemData={fields}
//                         itemSize={getRowHeight}
//                       >
//                         {({ index, data, ...restProps }) => {
//                           return (
//                             <FormListItem
//                               key={`list-item-${index}`}
//                               fields={data}
//                               ListItem={ListItem}
//                               remove={remove}
//                               move={move}
//                               add={add}
//                               getAddValue={getAddValue}
//                               removable={removable}
//                               editable={editable}
//                               renderIndex={index}
//                               setRowHeight={setRowHeight}
//                             />
//                           );
//                         }}
//                       </List>
//                     );
//                   }}
//                 </AutoSizer>
//               );
//             }}
//           </List>
//         );
//       }}
//     </AutoSizer>
//   );
// };

const CommonFormList = ({
  renderListItem: ListItem,
  name,
  hidden = false,
  shouldUpdate,
  container = ({ children }: { children: React.ReactNode }) => <>{children}</>,
  label,
  defaultValue,
  min,
  max,
  addable,
  removable,
  editable,
  addButtonProps,
  addComponent,
  showSerialNumber = false,
}: // removeButtonProps,
// removeComponent,
// moveButtonProps,
// moveComponent,
Omit<IFormListProps, "items" | "children"> & {
  pageSize?: number;
  rowHeight?: number;
} & Pick<FormItemProps, "shouldUpdate">) => {
  const Container = container;
  const formInstance = Form.useFormInstance();

  const getAddValue = () => {
    return defaultValue || null;
  };

  return (
    <Form.Item
      noStyle={!label}
      shouldUpdate={
        typeof shouldUpdate == "undefined" ? !!hidden : shouldUpdate
      }
      label={label}
    >
      <Form.List name={name}>
        {(fields, { add, remove, move }: FormListOperation) => {
          return (
            <Container
              showSerialNumber={showSerialNumber}
              content={({ as }: any) => {
                return (
                  <Suspense
                    fallback={<Spin spinning={true} tip="渲染中"></Spin>}
                  >
                    {fields.map((field, index) => {
                      return (
                        <FormListItem
                          key={`list-item-${index}`}
                          field={field}
                          ListItem={ListItem}
                          remove={remove}
                          move={move}
                          add={add}
                          getAddValue={getAddValue}
                          removable={removable}
                          editable={editable}
                          as={as}
                          index={index}
                          showSerialNumber={showSerialNumber}
                        />
                      );
                    })}
                  </Suspense>
                );
              }}
              actionBar={(props: any) => {
                return (
                  <>
                    {addUtil(addable, {
                      formInstance,
                      name,
                      min,
                      max,
                    }) && (
                      <AddButtonComponent
                        addComponent={addComponent}
                        {...(addButtonProps || {})}
                        onClick={() => add(getAddValue?.())}
                        {...props}
                      >
                        添加
                      </AddButtonComponent>
                    )}
                  </>
                );
              }}
            />
          );
        }}
      </Form.List>
    </Form.Item>
  );
};

export default CommonFormList;
