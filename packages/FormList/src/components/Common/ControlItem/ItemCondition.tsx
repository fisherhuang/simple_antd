import React, { memo } from "react";
import { Form } from "antd";
import { hiddenUtil } from "@src/common/util";

interface IConditionControlProps {
  hidden?: boolean | Function | undefined;
  shouldUpdate?: boolean | Function;
  name: string | string[];
  index: number;
  children: React.ReactNode;
}

const ControlItem = ({
  hidden,
  shouldUpdate,
  name,
  index,
  children,
}: IConditionControlProps) => {
  const formInstance = Form.useFormInstance();

  let _shouldUpdate: any = null;

  if (typeof hidden != "undefined" && typeof shouldUpdate == "undefined") {
    _shouldUpdate = true;
  } else {
    _shouldUpdate = shouldUpdate;
  }

  if (_shouldUpdate) {
    return (
      <Form.Item shouldUpdate={_shouldUpdate} noStyle>
        {() => {
          return (
            !hiddenUtil(hidden, {
              name,
              formInstance: formInstance,
              currentIndex: index,
            }) && <>{children}</>
          );
        }}
      </Form.Item>
    );
  }

  return <>{children}</>;
};

export default memo(ControlItem);
