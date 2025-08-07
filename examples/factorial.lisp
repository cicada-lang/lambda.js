(import "nat-church.lisp" zero? mul sub1)
(import "nat-church.lisp" one)
(import "bool.lisp" if)

(define (factorial n)
  (if (zero? n)
    one
    (mul n (factorial (sub1 n)))))
