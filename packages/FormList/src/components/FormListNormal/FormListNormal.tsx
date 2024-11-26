import React from "react";
import { Dropdown, Popconfirm } from "antd";
import CommonFormList from "../Common";
import type { FormListFieldData, FormListOperation } from "antd/es/form";
import type { IFormListProps } from "@src/types";
import type { IFormItemProps } from "@src/types";
import invariant from "invariant";
import ControlItem from "@src/components/Common/ControlItem";
import { MoveButtonComponent } from "../Common/MoveButton";
import { RemoveButtonComponent } from "../Common/RemoveButton";
import { AddButtonComponent } from "../Common/AddButton";

const FormListNormal: React.FunctionComponent<IFormListProps> = (props) => {
  const {
    items = [] as IFormItemProps[],
    renderListItem,
    container: Container = ({ children }: any) => <>{children}</>,
    ...restPpops
  } = props;

  invariant(items.length > 0, "items不能为空");

  return (
    <>
      <CommonFormList
        {...restPpops}
        renderListItem={(
          listItemprops: FormListFieldData &
            FormListOperation & {
              index: number;
              getAddValue?: Function;
              addable?: boolean;
              removable?: boolean;
            }
        ) => {
          const {
            name,
            index,
            add,
            move,
            remove,
            getAddValue,
            addable,
            removable,
          } = listItemprops;

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "6px",
                alignItems: "center",
              }}
            >
              {items.map((item: IFormItemProps, itemIndex: number) => {
                return (
                  <ControlItem
                    key={`control-${itemIndex}`}
                    item={item || {}}
                    name={name}
                    itemIndex={itemIndex}
                    fieldIndex={index}
                    formItemProps={{
                      ...item.formItemProps,
                      noStyle: true,
                    }}
                  ></ControlItem>
                );
              })}
              {addable && (
                <Dropdown
                  key={`add-button-${index}`}
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
                          add(getAddValue?.(), index == 0 ? index : index - 1);
                        },
                      },
                      {
                        label: "后面",
                        key: "next",
                        onClick: () => {
                          add(getAddValue?.(), index + 1);
                        },
                      },
                    ],
                  }}
                >
                  <AddButtonComponent
                    type="text"
                    size="small"
                    style={{
                      width: "auto",
                      height: "100%",
                      padding: 0,
                      margin: 0,
                    }}
                  />
                </Dropdown>
              )}
              {removable && (
                <Popconfirm
                  key={`remove-button-${index}`}
                  title={"你确定要删除这条数据？"}
                  onConfirm={() => {
                    remove(index);
                  }}
                >
                  <RemoveButtonComponent
                    type="text"
                    size="small"
                    style={{
                      width: "auto",
                      height: "100%",
                      padding: 0,
                      margin: 0,
                    }}
                    danger
                  ></RemoveButtonComponent>
                </Popconfirm>
              )}

              <Dropdown
                key={`move-button-${index}`}
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
                        move(index, index - 1);
                      },
                    },
                    {
                      label: "后面",
                      key: "next",
                      onClick: () => {
                        move(index, index + 1);
                      },
                    },
                  ],
                }}
              >
                <MoveButtonComponent
                  disabled={index === 0}
                  type="text"
                  size="small"
                  style={{
                    width: "auto",
                    height: "100%",
                    padding: 0,
                    margin: 0,
                  }}
                />
              </Dropdown>
            </div>
          );
        }}
        container={({
          content: Content,
          actionBar: ActionBar,
        }: // showSerialNumber,
        any) => {
          return (
            <Container>
              <Content as="div" />
              <ActionBar style={{ width: "100%" }} type="text" />
            </Container>
          );
        }}
      ></CommonFormList>
    </>
  );
};

export default FormListNormal;
