(import add mul "nat-church.lisp")
(import zero one two three four five "nat-church.lisp")

(import factorial "factorial-half.lisp")

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))
(assert-equal (factorial five) (mul five (mul four (mul three two))))
