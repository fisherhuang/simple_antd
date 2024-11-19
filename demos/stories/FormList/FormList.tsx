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
import {
  IFormItemProps,
  IFormListItemProps,
  IFormListProps,
} from "@simple-antd/formlist/src/types";

const children: IFormItemProps[] = [
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
      label: 1,
      name: "name1",
    },
    formControlProps: {} as InputProps,
  },
  {
    as: Select,
    formItemProps: {
      label: 2,
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
      label: 1,
      name: "name1",
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
      shouldUpdate: (preValue, curValue) => {
        return preValue.formListCard != curValue.formListCard;
      },
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

const generateSubData = (count) => {
  return Array.from(new Array(count)).map((item, index) => {
    return {
      sub_name2: `sub_name2_${index + 1}`,
      sub_name3: `sub_name3_${index + 1}`,
    };
  });
};

const generateData = (count) => {
  return Array.from(new Array(count)).map((item, index) => {
    return {
      id: index + 1,
      name2: `name2_${index + 1}`,
      name1: `name1_${index + 1}`,
      name3: `name3_${index + 1}`,
      sub_formList: generateSubData(8),
    };
  });
};

export const FormListCardStory = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      formListCard: generateData(50),
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
        items={children}
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
        items={children}
      ></FormListNormal>
    </Form>
  );
};

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
        items={children}
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
