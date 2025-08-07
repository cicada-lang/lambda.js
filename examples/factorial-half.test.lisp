(import "nat-church.lisp" add mul)
(import "nat-church.lisp" zero one two three four five)

(import "factorial-half.lisp" factorial)

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))
(assert-equal (factorial five) (mul five (mul four (mul three two))))
