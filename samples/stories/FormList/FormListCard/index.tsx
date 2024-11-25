import React, { useEffect } from "react";
import { Form, Button, InputNumber } from "antd";
import { FormListCard } from "@simple-antd/formlist";
import { generateData, generateSubData } from "../common/data";
import { formlistItems } from "../common/formListItems";

export const FormListCardStory = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      formListCard: generateData(10),
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
        label="input_number"
        rules={[{ required: true }]}
      >
        <InputNumber />
      </Form.Item>
      <FormListCard
        label="FormCardList Label"
        name="formListCard"
        items={formlistItems}
        max={2}
        min={1}
        removable={() => {
          return false;
        }}
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
      ></FormListCard>
      <Button htmlType="submit">保存</Button>
    </Form>
  );
};
