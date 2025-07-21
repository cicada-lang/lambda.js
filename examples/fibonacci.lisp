(import zero zero? add sub1 "nat-church.lisp")
(import one "nat-church.lisp")
(import if "bool.lisp")

(define (fibonacci n)
  (if (zero? n)
    zero
    (if (zero? (sub1 n))
      one
      (add (fibonacci (sub1 n))
           (fibonacci (sub1 (sub1 n)))))))
