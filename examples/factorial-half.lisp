(import zero? mul sub1 "nat-church.lisp")
(import one "nat-church.lisp")
(import if "bool.lisp")

(define factorial (factorial-half factorial-half))

(define (factorial-half self n)
  (if (zero? n)
    one
    (mul n (self self (sub1 n)))))
