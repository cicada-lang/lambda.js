(import id compose (rename compose c) "compose.lisp")

(assert-equal id (compose (compose id id) (compose id id)))
(assert-equal id (c (c id id) (c id id)))
