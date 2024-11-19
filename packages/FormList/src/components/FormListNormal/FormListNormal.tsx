import React from "react";
import CommonFormList from "../Common";
import type { IFormListProps } from "@src/types";

const FormListNormal: React.FunctionComponent<IFormListProps> = ({
  name,
  renderListItem,
}) => {
  return (
    <>
      <CommonFormList
        name={name}
        renderListItem={renderListItem}
      ></CommonFormList>
    </>
  );
};

export default FormListNormal;
