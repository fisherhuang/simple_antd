import React, { useEffect } from "react";
import { Form, Button, InputNumber } from "antd";
import { generateData, generateSubData } from "../common/data";
import { FormListTable } from "@simple-antd/formlist";
import { formlistItems } from "../common/formListItems";

export const FormListTableStory = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      formListTable: generateData(20),
    });
  }, []);

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      scrollToFirstError={{ behavior: "smooth" }}
      onFinish={(...args) => {
        console.log(args, "finished");
      }}
      onFinishFailed={(...args) => {
        console.log("finish failed", args);
      }}
    >
      <Form.Item
        name="input_number"
        label="table_input_number"
        rules={[{ required: true }]}
      >
        <InputNumber />
      </Form.Item>
      <FormListTable
        label="FormTableList Label"
        name="formListTable"
        items={formlistItems}
        showSerialNumber={true}
        container={({ children }) => {
          return (
            <div
              className=""
              style={{
                display: "flex",
                flexFlow: "column nowrap",
                gap: "20px",
                padding: "20px 0",
              }}
            >
              {children}
            </div>
          );
        }}
      ></FormListTable>
      <Button htmlType="submit">保存</Button>
    </Form>
  );
};

export default FormListTableStory;
