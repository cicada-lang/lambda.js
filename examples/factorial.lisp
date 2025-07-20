(import zero? mul sub1 "nat-church.lisp")
(import one "nat-church.lisp")
(import if "bool.lisp")

(define (factorial n)
  (if (zero? n)
    one
    (mul n (factorial (sub1 n)))))
