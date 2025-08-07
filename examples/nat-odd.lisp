(import "bool.lisp" true false if and or not)
(import "nat-church.lisp" zero add1 sub1 zero?)
(import "nat-church.lisp" one two three four)
(import "nat-even.lisp" even?)

(define (odd? n)
  (if (zero? n) false
      (even? (sub1 n))))
