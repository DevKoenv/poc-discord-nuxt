<template>
  <Toggle
    v-bind="forwarded"
    :class="cn(toggleVariants({ variant, size }), props.class)"
  >
    <slot />
  </Toggle>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import {
  Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits,
} from 'radix-vue';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '~/lib/utils';

export const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ToggleVariants = VariantProps<typeof toggleVariants>

const props = withDefaults(defineProps<ToggleProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
}>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
});

const emits = defineEmits<ToggleEmits>();

const delegatedProps = computed(() => {
  const {
    class: _, size, variant, ...delegated
  } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
