import React from "react";
import { fn } from "@storybook/test";

import { FormListTableStory } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "SimpleAntd/FormList/FormListTable",
  component: () => <>Form List Card</>,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn(), items: [], label: "", name: "" },
};

export { FormListTableStory };
