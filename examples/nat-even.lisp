(import true false if and or not "bool.lisp")
(import zero add1 sub1 zero? "nat-church.lisp")
(import one two three four "nat-church.lisp")
(import odd? "nat-odd.lisp")

(define (even? n)
  (if (zero? n) true
      (odd? (sub1 n))))
