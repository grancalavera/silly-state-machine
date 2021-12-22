import create from "zustand/vanilla";

export type SillyState = Empty | Accumulator | Success;

interface SillyStateMachine {
  state: SillyState;
  begin: () => void;
  accumulate: () => void;
  advance: () => void;
}

interface Empty {
  kind: "Empty";
}

interface Accumulator {
  kind: "Accumulator";
  value: number;
}

interface Success {
  kind: "Success";
  reward: number;
}

type Transition = (state: SillyState) => SillyState;

const begin: Transition = (state) => {
  if (state.kind === "Empty") {
    return { kind: "Accumulator", value: 0 };
  } else {
    throw new Error("Illegal Transition: Begin");
  }
};

const accumulate: Transition = (state) => {
  if (state.kind === "Accumulator") {
    return { ...state, value: state.value + 1 };
  } else {
    throw new Error("Illegal Transition: Accumulate");
  }
};

const advance: Transition = (state) => {
  if (state.kind === "Accumulator" && state.value < 10) {
    return { kind: "Empty" };
  } else if (state.kind === "Accumulator" && state.value >= 10) {
    return { kind: "Success", reward: Math.floor(Math.random() * 10 * state.value) };
  } else {
    throw new Error("Illegal Transition: Advance");
  }
};

export const store = create<SillyStateMachine>((set, get) => ({
  state: { kind: "Empty" },
  begin: () => {
    set({ state: begin(get().state) });
  },
  accumulate: () => {
    set({ state: accumulate(get().state) });
  },
  advance: () => {
    set({ state: advance(get().state) });
  },
}));
