(import zero one two three four five "nat-church.lisp")
(import fibonacci "fibonacci.lisp")

(assert-equal (fibonacci zero) zero)
(assert-equal (fibonacci one) one)
(assert-equal (fibonacci two) one)
(assert-equal (fibonacci three) two)
(assert-equal (fibonacci four) three)
(assert-equal (fibonacci five) five)

;; test readback of recursive functions

;; TODO fail:

;; fibonacci
