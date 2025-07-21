# readback

be able to readback ackermann function

- maybe use occur check for all the sub-expressions can solve this problem.

# equal

be able to check equivalence of ackermann function.
why delayed-apply is not enough for ackermann function?
is it possible to extend the algorithm to handle it?
if not, is it related to different classes of recursive functions?

# lazy evaluation

we still can bring back lazy evaluation by lazy + box,
lazy store exp + env, box store delayed-apply.
lazy will not evaluate to the final value,
thus should be stored in box.

but before we bring back lazy evaluation,
because the aim of us using lazy evaluation is firstly
for using `Y`, but with delayed-apply we can already use `Y`,
why?
