import { switchMap, take, tap } from "rxjs";
import { sillyService } from "./api";

sillyService
  .login()
  .pipe(
    take(1),
    tap((userAccount) => console.log("welcome", { userAccount })),
    switchMap(() => sillyService.createSillyStateStream())
  )
  .subscribe({
    next: (value) => console.log("next", { value }),
    complete: () => console.log("complete"),
    error: (reason) => console.log("failed:", { reason }),
  });
