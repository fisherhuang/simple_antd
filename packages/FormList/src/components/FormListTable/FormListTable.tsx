import { Button, Dropdown, Popconfirm } from "antd";
import type { FormListFieldData, FormListOperation } from "antd/es/form";
import React from "react";
import CommonFormList from "@src/components/Common";
import type { IFormItemProps, IFormListProps } from "@src/types";
import ControlItem from "@src/components/Common/ControlItem";
import invariant from "invariant";
import "@src/style/index.scss";
import { RemoveButtonComponent } from "../Common/RemoveButton";
import { AddButtonComponent } from "../Common/AddButton";

export type IFormListTableProps = IFormListProps & {
  tableProps?: React.TableHTMLAttributes<HTMLTableElement>;
};

const FormListTable: React.FunctionComponent<IFormListTableProps> = (props) => {
  const {
    items = [] as IFormItemProps[],
    renderListItem,
    tableProps,
    container: Container,
    ...restPpops
  } = props;

  invariant(items.length > 0, "items不能为空");

  const TableHead = ({ showSerialNumber }: any) => {
    return (
      <thead>
        <tr>
          {showSerialNumber && <th>序号</th>}
          {items.map((item: IFormItemProps, itemIndex: number) => {
            return (
              <th key={`head-${itemIndex}`}>{item.formItemProps?.label}</th>
            );
          })}
          <th>操作</th>
        </tr>
      </thead>
    );
  };

  return (
    <CommonFormList
      as="td"
      container={({
        content: Content,
        actionBar: ActionBar,
        showSerialNumber,
      }: any) => {
        return (
          <Container>
            <table
              cellPadding={0}
              cellSpacing={0}
              className="form-list-table"
              {...(tableProps || {})}
            >
              <TableHead showSerialNumber={showSerialNumber} />
              <tbody>
                <Content as="tr" />
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <ActionBar />
                  </td>
                </tr>
              </tfoot>
            </table>
          </Container>
        );
      }}
      {...restPpops}
      renderListItem={(
        listItemprops: FormListFieldData &
          FormListOperation & {
            index: number;
            getAddValue?: Function;
            showSerialNumber?: boolean;
          }
      ) => {
        const {
          add,
          remove,
          name,
          index,
          getAddValue,
          showSerialNumber,
        } = listItemprops;

        return (
          <>
            {showSerialNumber && <td>{index + 1}</td>}
            {items.map((item: IFormItemProps, itemIndex: number) => {
              return (
                <td>
                  <ControlItem
                    key={`control-${itemIndex}`}
                    item={{
                      ...(item || {}),
                      formItemProps: {
                        ...(item.formItemProps || {}),
                        label: "",
                        noStyle: true,
                      },
                    }}
                    name={name}
                    itemIndex={itemIndex}
                    fieldIndex={index}
                  />
                </td>
              );
            })}
            <td>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexFlow: "row nowrap",
                }}
              >
                <Dropdown
                  getPopupContainer={(triggerNode: HTMLElement) => {
                    return (
                      triggerNode.closest(".ant-card-actions") || document.body
                    );
                  }}
                  menu={{
                    items: [
                      {
                        label: "前面",
                        key: "prev",
                        onClick: () => {
                          console.log(
                            index,
                            index == 0 ? index : index - 1,
                            "--index == 0 ? index : index - 1 before"
                          );
                          add(getAddValue?.(), index == 0 ? index : index - 1);
                        },
                      },
                      {
                        label: "后面",
                        key: "next",
                        onClick: () => {
                          console.log(
                            index,
                            index + 1,
                            "after --index == 0 ? index : index - 1"
                          );
                          add(getAddValue?.(), index + 1);
                        },
                      },
                    ],
                  }}
                >
                  <AddButtonComponent
                    type="text"
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: 0,
                      margin: 0,
                    }}
                    text={`添加_${index}`}
                  ></AddButtonComponent>
                </Dropdown>
                <Popconfirm
                  title={"你确定要删除这条数据？"}
                  onConfirm={() => {
                    remove(index);
                  }}
                >
                  <RemoveButtonComponent
                    type="text"
                    size="small"
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: 0,
                      margin: 0,
                    }}
                    danger
                  ></RemoveButtonComponent>
                </Popconfirm>
              </div>
            </td>
          </>
        );
      }}
    ></CommonFormList>
  );
};

export default FormListTable;
