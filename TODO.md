# bug

[bug] `(assert-equal fibonacci fibonacci/1)` fail

- as i how understand it now, this fail,
  because of `sameInCtx` can only handle unary function,
  and loop forever in the case of `DelayedApply`.
  - should be like `readbackInCtx` in the case of `DelayedApply`,
    find the head of the `DelayedApply` to handle non unary functions.

[bug] `(assert-equal ackermann ackermann/1)` fail

- maybe is it possible to extend the algorithm to handle `ackermann`,
  if not, is it related to different classes of recursive functions?

[bug] why top level wrap need a eta?

```scheme
(define factorial-1 (factorial-wrap factorial-1))
(define (factorial-1 n) ((factorial-wrap factorial-1) n))
```

- can adding lazy evaluation help fix this?

# lazy evaluation

we still can bring back lazy evaluation by lazy + box,
lazy store exp + env, box store delayed-apply.
lazy will not evaluate to the final value,
thus should be stored in box.

but before we bring back lazy evaluation,
because the aim of us using lazy evaluation is firstly
for using `Y`, but with delayed-apply we can already use `Y`,
why?

maybe only way to understand a reduction strategy
is to see a lot of reduction paths.
we need to see why current strategy can handle `Y`.

# recursive lambda

use `RecursiveLambda` instead of `DefinedLambda`

- i tried, but it is too slow

`sameInCtx` -- use head on `DelayedApply`, but only for `RecursiveLambda`

- maybe this can pass `fibonacci`, but not `ackermann`

# later

`formatValue` -- use `let` to print closure
