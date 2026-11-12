"use client";

// shadcn-style toast store (reducer + hook), rendered by <Toaster />.
import * as React from "react";

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 4500;

type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  open?: boolean;
};

const actionTypes = { ADD_TOAST: "ADD_TOAST", UPDATE_TOAST: "UPDATE_TOAST", DISMISS_TOAST: "DISMISS_TOAST", REMOVE_TOAST: "REMOVE_TOAST" } as const;

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type Action =
  | { type: typeof actionTypes.ADD_TOAST; toast: ToasterToast }
  | { type: typeof actionTypes.UPDATE_TOAST; toast: Partial<ToasterToast> }
  | { type: typeof actionTypes.DISMISS_TOAST; toastId?: ToasterToast["id"] }
  | { type: typeof actionTypes.REMOVE_TOAST; toastId?: ToasterToast["id"] };

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return;
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};

const reducers = (state: ToasterToast[], action: Action): ToasterToast[] => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return [...state, { ...action.toast, id: action.toast.id }].slice(-TOAST_LIMIT);
    case actionTypes.UPDATE_TOAST:
      return state.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t));
    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;
      if (toastId) addToRemoveQueue(toastId);
      else state.forEach((t) => addToRemoveQueue(t.id));
      return state.map((t) => (t.id === toastId || toastId === undefined ? { ...t, open: false } : t));
    }
    case actionTypes.REMOVE_TOAST:
      return action.toastId ? state.filter((t) => t.id !== action.toastId) : [];
  }
};

const listeners: Array<(state: ToasterToast[]) => void> = [];
let memoryState: ToasterToast[] = [];
function dispatch(action: Action) {
  memoryState = reducers(memoryState, action);
  listeners.forEach((l) => l(memoryState));
}

export function toast({ title, description }: Omit<ToasterToast, "id">) {
  const id = genId();
  dispatch({ type: actionTypes.ADD_TOAST, toast: { id, title, description, open: true } });
  return { id, dismiss: () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id }) };
}

export function useToast() {
  const [state, setState] = React.useState<ToasterToast[]>(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const i = listeners.indexOf(setState);
      if (i > -1) listeners.splice(i, 1);
    };
  }, []);
  return { toasts: state, toast, dismiss: (id?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id }) };
}
