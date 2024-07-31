import { computed, ref } from "vue";
import type { Component, VNode } from "vue";
import type { ToastProps } from "~/types/Toast";

const TOAST_LIMIT = 99999;
const TOAST_REMOVE_DELAY = 5000;

export type StringOrVNode = string | VNode | (() => VNode);

type ToasterToast = ToastProps & {
  id: string;
  title?: string;
  description?: StringOrVNode;
  action?: Component;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const state = ref<State>({
  toasts: [],
});

function dispatch(action: Action) {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      state.value.toasts = [action.toast, ...state.value.toasts].slice(
        0,
        TOAST_LIMIT,
      );
      break;

    case actionTypes.UPDATE_TOAST:
      state.value.toasts = state.value.toasts.map((t) => {
        if (t.id === action.toast.id) {
          return { ...t, ...action.toast };
        }
        return t;
      });
      break;

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      if (toastId) {
        if (toastTimeouts.has(toastId)) return;

        const timeout = setTimeout(() => {
          toastTimeouts.delete(toastId);
          dispatch({
            type: actionTypes.REMOVE_TOAST,
            toastId,
          });
        }, TOAST_REMOVE_DELAY);

        toastTimeouts.set(toastId, timeout);
      } else {
        state.value.toasts.forEach((t) => {
          if (toastTimeouts.has(t.id)) return;

          const timeout = setTimeout(() => {
            toastTimeouts.delete(t.id);
            dispatch({
              type: actionTypes.REMOVE_TOAST,
              toastId,
            });
          }, TOAST_REMOVE_DELAY);

          toastTimeouts.set(t.id, timeout);
        });
      }

      state.value.toasts = state.value.toasts.map((t) => {
        if (t.id === toastId || toastId === undefined) {
          return {
            ...t,
            open: false,
          };
        }
        return t;
      });
      break;
    }

    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        state.value.toasts = [];
      } else {
        state.value.toasts = state.value.toasts.filter(
          (t) => t.id !== action.toastId,
        );
      }

      break;

    default:
      break;
  }
}

type Toast = Omit<ToasterToast, "id">;

function toast(props: Toast) {
  const id = genId();

  const update = (toastProps: ToasterToast) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...toastProps, id },
    });

  const dismiss = () =>
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

function useToast() {
  return {
    toasts: computed(() => state.value.toasts),
    toast,
    dismiss: (toastId?: string) =>
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

export { toast, useToast };
