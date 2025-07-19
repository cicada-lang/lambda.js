(import Y "fixpoint.lisp")

(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step prev)))
(define (which-Nat n base step) (n base step))

(define one (add1 zero))
(define two (add1 one))
(define three (add1 two))
(define four (add1 three))
(define five (add1 four))
(define six (add1 five))
(define seven (add1 six))
(define eight (add1 seven))
(define nine (add1 eight))
(define ten (add1 nine))

(define (sub1 n)
  (which-Nat n
    zero
    (lambda (prev) prev)))

(assert-equal (sub1 three) two)
(assert-equal (sub1 two) one)
(assert-equal (sub1 one) zero)
(assert-equal (sub1 zero) zero)

(define (add-wrap add)
  (lambda (m n)
    (which-Nat m
      n
      (lambda (prev) (add1 (add prev n))))))

(define add (Y add-wrap))

(assert-equal (add one one) two)
(assert-equal (add two two) four)
(assert-equal (add two five) seven)
(assert-equal (add three three) six)

(define (mul-wrap mul)
  (lambda (m n)
    (which-Nat m
      zero
      (lambda (prev) (add n (mul prev n))))))

(define mul (Y mul-wrap))

(assert-equal (mul two five) ten)
(assert-equal (mul three three) nine)
(assert-equal (add two two) (mul two two))

(assert-equal
  (mul two (mul two (mul two two)))
  (mul (mul two two) (mul two two)))
