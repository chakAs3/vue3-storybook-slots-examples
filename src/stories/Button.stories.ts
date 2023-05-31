import type { Meta, StoryObj } from '@storybook/vue3';

import Button from './Button.vue';
import { computed, ref, watch, h} from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' },
  },
  args: { primary: false }, // default value
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

export const ModifyArgs: Story = {
  args: {
    text: 'Button',
    size: 'small',
    variant: 'primary',
    modifiers:[]
  },
  render: ( args: any ) => ({
    components: { Button },
    setup() {

      const modifiers = computed(() => [...args.modifiers || [],args.variant,args.size]);
      return { args,modifiers };
    },
    template: `<Button v-bind="args" :modifiers="modifiers" @click="onClick">
                modifiers:{{JSON.stringify(modifiers)}}
              </Button>`,
  })
};

const Template = (args: any) => ({
  components: { Button },
  setup() {

    const mergeModifier = ref( args.modifiers ?? [])
    watch(
      () => [...args.modifiers || [],args.variant,args.size],
      (modifiers: []) => mergeModifier.value = modifiers ,
      { immediate : true}
    )
    return { args, mergeModifier };
  },
  template: `
        <Button v-bind="args" :modifier="mergeModifier">
         modifiers :{{JSON.stringify(mergeModifier)}}.
        </Button>`
});

export const DarkitButton: Story = {
  render:  Template,
  args: {
    icon: 'shopping-cart',
    text: 'Add to cart',
    variant: 'primary',
    size: 'small'
  }
};

