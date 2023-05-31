import type { StorybookConfig } from '@storybook/vue3-vite';
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  previewAnnotations: [],
  features: {},
  viteFinal: config => ({
    ...config,
    optimizeDeps: {
      ...config.optimizeDeps,
      force: true
    },
    server: {
      ...config.server,
      fs: {
        ...config.server?.fs,
        allow: ['stories', 'src', 'template-stories', 'node_modules', ...(config.server?.fs?.allow || [])]
      }
    }
  })
};
export default config;