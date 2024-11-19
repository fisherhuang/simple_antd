import { Button, type ButtonProps } from "antd";

export const AddButtonComponent = (
  props: ButtonProps & {
    addComponent?: React.ReactNode | React.FunctionComponent<ButtonProps>;
    text?: string;
  }
) => {
  const { addComponent:AddComponent,text='添加', ...rest } = props;
  if (!AddComponent) return <Button {...rest}> {text} </Button>;

  if (
    Object.prototype.toString.call(AddComponent) === "[object Function]"
  )
    //@ts-ignore
    return <props.addComponent></props.addComponent>;

  return <>{props.addComponent}</>;
};
