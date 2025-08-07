(import "compose.lisp" id compose (rename compose c))

(assert-equal id (compose (compose id id) (compose id id)))
(assert-equal id (c (c id id) (c id id)))
