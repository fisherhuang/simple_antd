import React from "react";
import CommonFormList from "../Common";
import type { IFormListProps } from "@src/types";
import type { IFormItemProps } from "@src/types";
import invariant from "invariant";

const FormListNormal: React.FunctionComponent<IFormListProps> = (props) => {
  const {
    items = [] as IFormItemProps[],
    renderListItem,
    container: Container = ({ children }: any) => <>{children}</>,
    ...restPpops
  } = props;

  invariant(items.length > 0, "items不能为空");

  return (
    <>
      <CommonFormList
        {...restPpops}
        renderListItem={renderListItem}
        container={({
          content: Content,
          actionBar: ActionBar,
        }: // showSerialNumber,
        any) => {
          return (
            <Container>
              <Content as="div" />
              <ActionBar style={{ width: "100%" }} type="text" />
            </Container>
          );
        }}
      ></CommonFormList>
    </>
  );
};

export default FormListNormal;
