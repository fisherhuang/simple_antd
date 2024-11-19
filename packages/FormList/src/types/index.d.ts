import type { FormListProps, FormItemProps } from "antd/es/form";
import type React from "react";

export interface IFormItemInternalProps extends FormItemProps {
  hidden?: boolean | Function;
}

export interface IFormItemProps<T = any> {
  type?: string | "formlist";
  as?: string | ((props: any) => React.ReactNode | JSX.Element);
  formItemProps?: IFormItemInternalProps;
  formControlProps?: T;
}

export interface IFormListItemProps<T = any>
  extends IFormItemProps,
    IFormListProps {
  type?: string | "formlist";

  renderType?: "normal" | "card" | "table";
  items: IFormItemProps<T>[];
  showSerialNumber?: boolean;
}

export type IFormListProps = {
  renderListItem: (prop: any) => JSX.Element;
  hidden?: boolean | Function;
  defaultValue?: React.ReactNode;
  items: IFormItemProps[];
  container?: React.FunctionComponent<
    { children: React.ReactNode },
    HTMLElement
  >;
  label?: React.ReactNode;
  min?: number;
  max?: number;
  removable?: boolean | ((data?: any) => boolean);
  addable?: boolean | ((data?: any) => boolean);
  editable?: boolean | ((data?: any) => boolean);
  as?: React.ReactNode;
  addButtonProps?: ButtonProps;
  removeButtonProps?: ButtonProps;
  moveButtonProps?: ButtonProps;
  moveComponent?: React.ReactNode | React.FunctionComponent<ButtonProps>;
  removeComponent?: React.ReactNode | React.FunctionComponent<ButtonProps>;
  addComponent?: React.ReactNode | React.FunctionComponent<ButtonProps>;
  showSerialNumber?: boolean;
} & FormListProps;
