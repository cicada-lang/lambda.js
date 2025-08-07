(import "nat-church.lisp" zero? mul sub1)
(import "nat-church.lisp" one)
(import "bool.lisp" if)

(define factorial (factorial-half factorial-half))

(define (factorial-half self n)
  (if (zero? n)
    one
    (mul n (self self (sub1 n)))))
