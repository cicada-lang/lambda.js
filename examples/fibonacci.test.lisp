(import "nat-church.lisp" zero one two three four five)
(import "fibonacci.lisp" fibonacci)

(assert-equal (fibonacci zero) zero)
(assert-equal (fibonacci one) one)
(assert-equal (fibonacci two) one)
(assert-equal (fibonacci three) two)
(assert-equal (fibonacci four) three)
(assert-equal (fibonacci five) five)

;; test readback

fibonacci
