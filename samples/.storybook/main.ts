/** @type { import('@storybook/react-vite').StorybookConfig } */
const path = require("path");
const config = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  viteFinal: (config) => {
    if (config["server"]) {
      config["server"]["host"] = "127.0.0.1";
    }

    if (config["resolve"]) {
      config["resolve"]["alias"] = {
        "@formlist": path.resolve(
          __dirname,
          "..",
          "packages/FormList/src"
        ),
      };
    }
    return config;
  },
};
export default config;
