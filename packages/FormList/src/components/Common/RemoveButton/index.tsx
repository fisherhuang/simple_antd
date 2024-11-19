import { Button, type ButtonProps } from "antd";

export interface RemoveButtonProps extends ButtonProps {
  removeComponent?: React.ReactNode | React.FunctionComponent<ButtonProps>;
}

export const RemoveButtonComponent = (props: RemoveButtonProps) => {
  const { removeComponent: RemoveComponent, ...rest } = props;
  if (!props.removeComponent) return <Button icon={<>&times;</>} {...rest}> 移除 </Button>;

  if (
    Object.prototype.toString.call(props.removeComponent) ===
    "[object Function]"
  )
    //@ts-ignore
    return <props.removeComponent></props.removeComponent>;

  return <>{props.removeComponent}</>;
};
