export const generateSubData = (count) => {
  return Array.from(new Array(count)).map((item, index) => {
    return {
      sub_name2: `sub_name2_${index + 1}`,
      sub_name3: `sub_name3_${index + 1}`,
    };
  });
};

export const generateData = (count) => {
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
