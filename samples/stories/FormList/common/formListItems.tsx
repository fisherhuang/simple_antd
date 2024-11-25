import React from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  Select,
  SelectProps,
} from "antd";

import {
  IFormItemProps,
  IFormListItemProps,
  IFormListProps,
} from "@simple-antd/formlist/src/types";

export const formlistItems: IFormItemProps[] = [
  {
    formItemProps: {
      label: 0,
      name: "id",
      hidden: true,
    },
  },
  {
    as: Input,
    formItemProps: {
      label: "name1",
      name: "name1",
    },
    formControlProps: {} as InputProps,
  },
  {
    as: Select,
    formItemProps: {
      label: "name2",
      name: "name2",
    },
    formControlProps: {
      options: [
        { label: "option 1", value: 1 },
        { label: "option 2", value: 2 },
      ],
    },
  } as IFormItemProps<SelectProps>,
  {
    as: Input,
    formItemProps: {
      label: "显示隐藏控制",
      name: "name4",
      hidden: (value, { formInstance, name, currentIndex }) => {
        let _name = ["formListCard", currentIndex];
        return formInstance.getFieldValue(_name)?.["name2"] == 2;
      },
    },
    formControlProps: {} as InputProps,
  },
  {
    as: InputNumber,
    formItemProps: {
      label: <>Input Number</>,
      name: "name3",
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
      rules: [{ required: true, message: "name3 is required" }],
      hidden: ({ name2 }, { name, formInstance, currentIndex }) => {
        let _name = ["formListCard", currentIndex];
        return formInstance.getFieldValue(_name)?.["name2"] == 2;
      },
    },
    formControlProps: {
      min: 1,
      max: 20,
      step: 2,
    },
  } as IFormItemProps<InputNumberProps>,
  {
    type: "formlist",
    renderType: "table",
    showSerialNumber: true,
    formItemProps: {
      label: "sub_formlist",
      name: "sub_formList",
    },
    container: ({ children }) => {
      return (
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-around",
            gap: 20,
          }}
        >
          {children}
        </div>
      );
    },
    items: [
      {
        formItemProps: {
          name: "sub_name2",
          label: "sub_name2",
          rules: [{ required: true }],
        },
      },
      {
        formItemProps: {
          name: "sub_name3",
          label: "sub_name3",
        },
      },
    ],
  } as IFormListItemProps,
];
