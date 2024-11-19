import { Button, type ButtonProps } from "antd";

export const MoveButtonComponent = (
  props: ButtonProps & {
    moveComponent?: React.ReactNode | React.FunctionComponent<ButtonProps>;
  }
) => {
  const { moveComponent: MoveComponent, ...rest } = props;
  if (!props.moveComponent) return <Button icon={<>&#10021;</>} {...rest}> 移动 </Button>;

  if (
    Object.prototype.toString.call(props.moveComponent) === "[object Function]"
  )
    //@ts-ignore
    return <props.moveComponent></props.moveComponent>;

  return <>{props.moveComponent}</>;
};
