import React, { memo, useMemo, useState } from "react";
import { Form, Input } from "antd";
import { FormListCard } from "@src/components/FormListCard";
import ItemCondition from "./ItemCondition";
import { FormListTable } from "@src/components/FormListTable";
import { FormListNormal } from "@src/components/FormListNormal";
import type { IFormListCardProps } from "@src/components/FormListCard/FormListCard";
import type { IFormListTableProps } from "@src/components/FormListTable/FormListTable";
import type { IFormListItemProps, IFormListProps } from "@src/types";
import invariant from "invariant";

const ControlItem = ({ item = {}, itemIndex, fieldIndex, name }: any) => {
  let AsComponent = item?.as || Input;

  let { name: formItemName, hidden, shouldUpdate, ...restFormItemProps } =
    item?.formItemProps || {};

  let _name: string | string[] = Array.isArray(formItemName)
    ? [...[name], ...formItemName]
    : [name, formItemName];

  if (item?.type == "formlist") {
    const RenderComponents = {
      table: FormListTable,
      card: FormListCard,
      normal: FormListNormal,
    };

    const { type, renderType, as, ...restSubItem } = item as IFormListItemProps;

    invariant(
      restSubItem?.items?.length > 0,
      "FormList 的 items 至少需要一个子项"
    );

    let Component: React.FunctionComponent<
      IFormListCardProps | IFormListTableProps | IFormListProps
    > = RenderComponents[renderType || "normal"] || FormListNormal;

    return (
      <Component
        key={`form-list-item-${itemIndex}`}
        {...restSubItem}
        name={_name}
      />
    );
  }
  console.log(item, "control item");
  let control = useMemo(() => {
    return (
      <ItemCondition
        shouldUpdate={shouldUpdate}
        hidden={hidden}
        name={_name}
        index={fieldIndex}
      >
        <Form.Item
          label={item?.formItemProps?.label}
          name={_name}
          hidden={typeof hidden == "boolean" ? hidden : false}
          {...restFormItemProps}
        >
          {/* <DisplayControl></DisplayControl> */}
          <AsComponent {...item.formControlProps}></AsComponent>
        </Form.Item>
      </ItemCondition>
    );
  }, []);

  return (
    <React.Fragment key={`form-list-item-${itemIndex}`}>
      {control}
    </React.Fragment>
  );
};

export const DisplayControl = (props: any) => {
  return <>{props.value || ""}</>;
};

export default memo(ControlItem);
