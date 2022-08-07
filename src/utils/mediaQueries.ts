import { BehaviorSubject, fromEvent, map, merge, share } from "rxjs";

const breakpoints = [600, 900, 1200, 1536];

export const breakpoint = merge(
  ...breakpoints.map((point, i) =>
    fromEvent<MediaQueryListEvent>(
      window.matchMedia(`(min-width: ${point}px)`),
      "change"
    ).pipe(map((e) => i + (e.matches as any)))
  )
).pipe(
  share({
    connector: () =>
      new BehaviorSubject(
        [...breakpoints, Infinity].findIndex(
          (point) => window.innerWidth < point
        )
      ),
  })
);

breakpoint.subscribe(console.log);

// TODO adding ingredient already on list
