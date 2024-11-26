import React, { useRef } from "react";

const FormListItem = ({
  ListItem,
  remove,
  move,
  add,
  addable,
  getAddValue,
  removable,
  editable,
  field,
  as: AsComponent = "div",
  index,
  showSerialNumber,
}: any) => {
  const itemRef = useRef<HTMLDivElement | HTMLTableColElement>(null);

  const { name } = field;

  return (
    <AsComponent ref={itemRef}>
      <ListItem
        index={index}
        field={field}
        remove={remove}
        move={move}
        add={add}
        getAddValue={getAddValue}
        name={name}
        removable={removable}
        editable={editable}
        showSerialNumber={showSerialNumber}
        addable={addable}
      ></ListItem>
    </AsComponent>
  );
};

FormListItem.displayName = "FormListItem";
export default FormListItem;
