/** @type { import('@storybook/react').Preview } */

import "@simple-antd/formlist/dist/style.css";

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
