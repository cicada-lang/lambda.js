(import true false if and or not "bool.lisp")
(import zero add1 sub1 zero? "nat-church.lisp")
(import one two three four "nat-church.lisp")

(define (even? n)
  (if (zero? n) true
      (odd? (sub1 n))))

(define (odd? n)
  (if (zero? n) false
      (even? (sub1 n))))

;; test readback of recursive functions

even?
odd?

(assert-equal true (even? zero))
(assert-equal true (even? two))
(assert-equal true (even? four))

(assert-equal false (even? one))
(assert-equal false (even? three))

(assert-equal false (odd? zero))
(assert-equal false (odd? two))
(assert-equal false (odd? four))

(assert-equal true (odd? one))
(assert-equal true (odd? three))

;; test equivalence between recursive functions

(assert-equal even? even?)
(assert-equal odd? odd?)

(assert-equal
  even?
  (lambda (n)
    (if (zero? n) true
        (odd? (sub1 n)))))

(assert-not-equal
  odd?
  (lambda (n)
    (if (zero? n) true
        (odd? (sub1 n)))))
