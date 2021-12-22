import { map, Observable, of, tap } from "rxjs";
import { SillyState, store } from "./state";

interface UserAccount {
  username: string;
}

interface SillyServiceAPI {
  login: () => Observable<UserAccount>;
  createSillyStateStream: () => Observable<SillyState>;
}

export const sillyService: SillyServiceAPI = {
  login: () =>
    of(store).pipe(
      tap((s) => s.getState().begin()),
      map(() => ({
        username: "foobar",
      }))
    ),
  createSillyStateStream: () =>
    of(store).pipe(
      tap(() => {
        if (store.getState().state.kind !== "Accumulator") {
          throw new Error(
            `You can't accumulate while in "${store.getState().state.kind}"`
          );
        }
      }),
      map((s) => s.getState().state)
    ),
};
