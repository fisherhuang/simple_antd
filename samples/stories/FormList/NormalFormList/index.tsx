import React, { useEffect } from "react";
import {
  FormListCard,
  FormListNormal,
  FormListTable,
} from "@simple-antd/formlist";
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
import { formlistItems } from "../common/formListItems";
import { generateData, generateSubData } from "../common/data";

export const FormListNormalStory = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      formListNormal: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
      ],
    });
  }, []);

  return (
    <Form form={form}>
      <FormListNormal
        label="FormCardList Label"
        name="formListNormal"
        items={formlistItems}
      ></FormListNormal>
    </Form>
  );
};
