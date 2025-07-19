(import true false if and or not "bool.lisp")
(import zero add1 sub1 zero? "nat-church.lisp")
(import one two three four "nat-church.lisp")
(import even? "nat-even.lisp")

(define (odd? n)
  (if (zero? n) false
      (even? (sub1 n))))
