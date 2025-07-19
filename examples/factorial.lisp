(import zero? add mul sub1 "nat-church.lisp")
(import zero one two three four "nat-church.lisp")
(import if true false "bool.lisp")

;; (claim factorial (-> Nat Nat))

(define (factorial n)
  (if (zero? n)
    one
    (mul n (factorial (sub1 n)))))

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))

;; equivalence between recursive functions:

;; factorial

;; (assert-equal factorial factorial)

;; (assert-equal
;;   factorial
;;   (lambda (x) (factorial x))
;;   (lambda (y) (factorial y)))

;; (assert-equal
;;   (lambda (x) (factorial x))
;;   factorial)
