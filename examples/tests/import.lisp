(import id compose (rename compose c) "./compose.lisp")

(assert-equal
  (compose
   (compose id id)
   (compose id id))
  (c (c id id) (c id id))
  id)
