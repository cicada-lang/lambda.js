inline `assertEqual` and `assertNotEqual`

test `assert-same` & `assert-not-same`

`equalInCtx` with `ctx.trail` handle recursive function
`equalInCtx` call `applyOneStep`

`readback` handle recursive function

fix `examples/factorial.lisp`
fix `examples/nat-even-odd.lisp`

refactor `load` to support circular imports

- if we can support mutually defined recursive function,
  we should also support circular imports.

# later

`let-one` vs `let` and `let*`

# builtin

maybe keep this project simple
and do a untyped language with builtin as my-lisp

about project names:

plan A:

- lambda-lisp -- this project
- my-lisp -- dynamic type
- st-lisp -- structural type
- es-lisp -- explicit substitution
- hm-lisp -- hindley-milner type

plan B:

- lambda-lisp -- this project
- x-lisp -- dynamic type
- my-lisp -- structural type
- es-lisp -- explicit substitution
- hm-lisp -- hindley-milner type

plan B:

clay-lisp
mold-lisp

- lambda-lisp -- this project
- my-lisp -- dynamic type
- typed-lisp -- structural type
- es-lisp -- explicit substitution
- hm-lisp -- hindley-milner type
