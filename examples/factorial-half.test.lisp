(import add mul "nat-church.lisp")
(import zero one two three four "nat-church.lisp")

(import factorial-half factorial "factorial-half.lisp")

factorial-half

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))
