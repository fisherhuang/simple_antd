import type { FormInstance } from "antd";

export type IUtilOptions = {
  name: string | number | (string | number)[];
  formInstance: FormInstance;
  currentIndex?: number;
  min?: number;
  max?: number;
};

export const hiddenUtil = (
  hidden: boolean | Function | undefined,
  { name, formInstance, currentIndex }: IUtilOptions
) => {
  if (typeof hidden == "undefined") return false;

  if (typeof hidden == "boolean") return hidden;

  if (Object.prototype.toString.call(hidden) == "[object Function]") {
    return hidden(formInstance.getFieldsValue(), {
      name,
      currentIndex,
      formInstance,
    });
  }
};

export interface IDynamicFormItemprops {
  hidden?: boolean | Function;
  shouldUpdate?: boolean | Function;
}

export const addUtil = (
  addable: boolean | Function | undefined,
  { name, formInstance, currentIndex }: IUtilOptions
) => {
  if (typeof addable == "undefined") return true;

  if (typeof addable == "boolean") return addable;

  if (Object.prototype.toString.call(addable) == "[object Function]") {
    return addable(formInstance.getFieldsValue(), {
      name,
      currentIndex,
      formInstance,
    });
  }
};

export const removeUtil = (
  removable: boolean | Function | undefined,
  { name, formInstance, currentIndex }: IUtilOptions
) => {
  if (typeof removable == "undefined") return false;

  if (typeof removable == "boolean") return removable;

  if (Object.prototype.toString.call(removable) == "[object Function]") {
    return removable(formInstance.getFieldsValue(), {
      name,
      currentIndex,
      formInstance,
    });
  }
};
// export const useDynamicFormItem = ({
//   hidden,
//   shouldUpdate,
// }: IDynamicFormItemprops) => {
//   if (typeof shouldUpdate == "undefined" && typeof hidden != "undefined") {

//   }

//   return <>{children}</>
// };
