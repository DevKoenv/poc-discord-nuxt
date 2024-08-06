<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
    <slot />
  </AvatarRoot>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { AvatarRoot } from "radix-vue";
import { cn } from "~/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const avatarVariant = cva(
  "inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-secondary font-normal text-foreground",
  {
    variants: {
      size: {
        sm: "size-10 text-xs",
        base: "size-16 text-2xl",
        lg: "size-32 text-5xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
  },
);

export type AvatarVariants = VariantProps<typeof avatarVariant>;

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    size?: AvatarVariants["size"];
    shape?: AvatarVariants["shape"];
  }>(),
  {
    class: "",
    size: "sm",
    shape: "circle",
  },
);
</script>
