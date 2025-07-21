# readback

remove `readback`

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

# equal

be able to check equivalence of ackermann function.
why delayed-apply is not enough for ackermann function?
is it possible to extend the algorithm to handle it?
if not, is it related to different classes of recursive functions?

we should try to do the same that we did for `length` functions,
extending `ackermann` to see why what works for `length` failed.

no need `ackermann`, `fibonacci` already fails.

why top level wrap need a eta?

```scheme
(define factorial-1 (factorial-wrap factorial-1))
(define (factorial-1 n) ((factorial-wrap factorial-1) n))
```

can adding lazy evaluation help fix this?
