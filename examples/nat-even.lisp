(import "bool.lisp" true false if and or not)
(import "nat-church.lisp" zero add1 sub1 zero?)
(import "nat-church.lisp" one two three four)
(import "nat-odd.lisp" odd?)

(define (even? n)
  (if (zero? n) true
      (odd? (sub1 n))))
