;; Parigot Encoding of Natural Number

(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step prev (prev base step))))
(define (rec-Nat n base step) (n base step))

;; ## Typing

;; (claim zero
;;   (nu (X)
;;     (-> X (-> Nat X X) X)))

;; (define Nat
;;   (nu (X)
;;     (-> X (-> Nat X X) X)))

;; (claim add1
;;   (-> Nat Nat)
;;   (nu (X)
;;     (-> Nat (-> X (-> Nat X X) X))))

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

(define (add m n)
  (rec-Nat m
    n
    (lambda (prev almost) (add1 almost))))

(assert-equal (add two five) seven)
(assert-equal (add three three) six)

(define (mul m n)
  (rec-Nat m
    zero
    (lambda (prev almost) (add n almost))))

(assert-equal (mul two five) ten)
(assert-equal (mul three three) nine)
(assert-equal (add two two) (mul two two))

(assert-equal
  (mul two (mul two (mul two two)))
  (mul (mul two two) (mul two two)))

(define (sub1 n)
  (rec-Nat n
    zero
    (lambda (prev almost) prev)))

(assert-equal (sub1 three) two)
(assert-equal (sub1 two) one)
(assert-equal (sub1 one) zero)
(assert-equal (sub1 zero) zero)

(define (factorial n)
  (rec-Nat n
    one
    (lambda (prev almost) (mul (add1 prev) almost))))

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))

;; The following number is huge! Sorry~

;; (assert-equal (factorial four) (mul four (mul three two)))
