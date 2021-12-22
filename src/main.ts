import { of, tap } from "rxjs";
import create from "zustand/vanilla";

type SillyStateMachine = Empty | Accumulator | Success;
type Transition = (state: SillyStateMachine) => SillyStateMachine;

interface Empty {
  kind: "Empty";
}

interface Accumulator {
  kind: "Accumulator";
  value: number;
}

interface Success {
  kind: "Success";
}

interface SillyStateStore {
  state: SillyStateMachine;
  begin: () => void;
  accumulate: () => void;
  advance: () => void;
}

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
    return { kind: "Success" };
  } else {
    throw new Error("Illegal Transition: Advance");
  }
};

const store = create<SillyStateStore>((set, get) => ({
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

const store$ = of(store).pipe(
  tap((s) => {
    s.getState().begin();
    s.getState().accumulate();
    s.getState().accumulate();
    s.getState().accumulate();
    s.getState().accumulate();
    s.getState().accumulate();
    s.getState().accumulate();
    s.getState().accumulate();
    s.getState().accumulate();
    s.getState().accumulate();
    s.getState().accumulate();
    s.getState().accumulate();
    s.getState().advance();
  })
);

store$.subscribe({
  next: (value) => console.log({ state: value.getState().state }),
  complete: () => console.log("complete"),
  error: (reason) => console.log({ reason }),
});
