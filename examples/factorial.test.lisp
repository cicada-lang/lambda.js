(import add mul "nat-church.lisp")
(import zero one two three four "nat-church.lisp")

(import factorial "factorial.lisp")

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))

;; test equivalence between recursive functions

(assert-same factorial factorial)
(assert-equal factorial factorial)

(assert-not-same factorial (lambda (x) (factorial x)))
(assert-equal factorial (lambda (y) (factorial y)))
(assert-equal factorial (lambda (x) (factorial x)))
(assert-equal (lambda (x) (factorial x)) (lambda (y) (factorial y)))
