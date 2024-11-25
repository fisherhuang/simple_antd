import React from "react";
import CommonFormList from "../Common";
import type { FormListFieldData, FormListOperation } from "antd/es/form";
import type { IFormListProps } from "@src/types";
import type { IFormItemProps } from "@src/types";
import invariant from "invariant";
import ControlItem, { DisplayControl } from "@src/components/Common/ControlItem";

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
            FormListOperation & { index: number; getAddValue?: Function }
        ) => {
          const { add, remove, move, name, index, getAddValue } = listItemprops;

          return (
            <>
              {items.map((item: IFormItemProps, itemIndex: number) => {
                return (
                  <ControlItem
                    key={`control-${itemIndex}`}
                    item={item || {}}
                    name={name}
                    itemIndex={itemIndex}
                    fieldIndex={index}
                  ></ControlItem>
                );
              })}
            </>
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
