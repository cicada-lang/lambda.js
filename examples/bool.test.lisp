(import "bool.lisp" true false if and or not)

(assert-equal (and true false) false)
(assert-equal (or true false) true)
(assert-equal (not true) false)
(assert-equal (not (not true)) true)

(assert-equal
  (lambda (x) (not (not true)))
  (lambda (x) true))
