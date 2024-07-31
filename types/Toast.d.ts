import type { ToastRootProps } from "radix-vue";

type variants = {
  variants: {
    variant: {
      default: string;
      destructive: string;
    };
  };
  defaultVariants: {
    variant: string;
  };
};

type ToastVariants = VariantProps<variants>;

export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes["class"];
  variant?: ToastVariants["variant"];
  onOpenChange?: ((value: boolean) => void) | undefined;
}
