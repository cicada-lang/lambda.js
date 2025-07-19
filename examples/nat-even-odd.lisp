(import true false if and or not "bool.lisp")
(import zero add1 sub1 zero? "nat-church.lisp")
(import one two three four "nat-church.lisp")

(define (even? n)
  (if (zero? n) true
      (odd? (sub1 n))))

(define (odd? n)
  (if (zero? n) false
      (even? (sub1 n))))

(assert-equal
  (even? zero)
  (even? two)
  (even? four)
  true)

(assert-equal
  (even? one)
  (even? three)
  false)

(assert-equal
  (odd? zero)
  (odd? two)
  (odd? four)
  false)

(assert-equal
  (odd? one)
  (odd? three)
  true)

;; equivalence between recursive functions:

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
