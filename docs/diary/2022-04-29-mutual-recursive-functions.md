---
title: Mutual Recursive Functions
date: 2022-04-29
---

# Inlining

We can support mutual recursive functions by
tracing dependencies of function definition,
and inlining mutual recursive function call
to get a direct recursive function.

For example

- `even?` depends on `odd?`
- `odd?` depends on `even?`

If we inline `odd?` into `even?`, we get a direct recursive definition.

But a function can not be both mutual recursive and direct recursive.

For example

- `even?` depends on `odd?`
- `odd?` depends on `even?` and `odd?`

If we inline `odd?` into `even?`,
the definition of `even?` is still depends on `odd?`,
and `even?` indirectly recursive through `odd?`.

In this case, we can inline `even?` into `odd?` first,
and then inline `odd?` into `even?`.

But in general case, inlining does not work.

For example

- `even?` depends on `odd?` and `even?`
- `odd?` depends on `even?` and `odd?`

If we implement mutual recursive by inlining,
we must check whether inlining will eliminate
all the indirect recursive references.

[2025-07-15] 可以不是 eager inlining，
而是在判断 equivalence 的时候 lazy inlining。

# General Fixpoint

Another way to implement mutual recursion is to
generalize fixpoint to support multiple functions.

Unlike inlining, structural equivalence between functions will be weaker.
