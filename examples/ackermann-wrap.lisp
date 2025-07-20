(import zero add1 sub1 zero? "nat-church.lisp")
(import one two three four five "nat-church.lisp")
(import if "bool.lisp")
(import Y "fixpoint.lisp")
(import ackermann "ackermann.lisp")

(define ackermann-wrap
  (lambda (ackermann)
    (lambda (m n)
      (if (zero? m)
        (add1 n)
        (if (zero? n)
          (ackermann (sub1 m) one)
          (ackermann (sub1 m) (ackermann m (sub1 n))))))))


(assert-equal ((Y ackermann-wrap) zero zero) one)
(assert-equal ((Y ackermann-wrap) one zero) two)
(assert-equal ((Y ackermann-wrap) zero one) two)
(assert-equal ((Y ackermann-wrap) two zero) three)
(assert-equal ((Y ackermann-wrap) one one) three)
(assert-equal ((Y ackermann-wrap) zero two) three)
(assert-equal ((Y ackermann-wrap) three zero) five)
(assert-equal ((Y ackermann-wrap) two one) five)
(assert-equal ((Y ackermann-wrap) one two) four)
(assert-equal ((Y ackermann-wrap) zero three) four)

(assert-equal ackermann (ackermann-wrap ackermann))
(assert-equal ackermann (ackermann-wrap (ackermann-wrap ackermann)))

(define (ackermann-1 m n)
  ((ackermann-wrap ackermann-1)
   m n))

(assert-equal (ackermann-1 zero zero) one)
(assert-equal (ackermann-1 one zero) two)
(assert-equal (ackermann-1 zero one) two)
(assert-equal (ackermann-1 two zero) three)
(assert-equal (ackermann-1 one one) three)
(assert-equal (ackermann-1 zero two) three)
(assert-equal (ackermann-1 three zero) five)
(assert-equal (ackermann-1 two one) five)
(assert-equal (ackermann-1 one two) four)
(assert-equal (ackermann-1 zero three) four)

(define (ackermann-2 m n)
  ((ackermann-wrap
    (ackermann-wrap ackermann-2))
   m n))

(assert-equal (ackermann-2 zero zero) one)
(assert-equal (ackermann-2 one zero) two)
(assert-equal (ackermann-2 zero one) two)
(assert-equal (ackermann-2 two zero) three)
(assert-equal (ackermann-2 one one) three)
(assert-equal (ackermann-2 zero two) three)
(assert-equal (ackermann-2 three zero) five)
(assert-equal (ackermann-2 two one) five)
(assert-equal (ackermann-2 one two) four)
(assert-equal (ackermann-2 zero three) four)

(define (ackermann-3 m n)
  ((ackermann-wrap
    (ackermann-wrap
     (ackermann-wrap ackermann-3)))
   m n))

(assert-equal (ackermann-3 zero zero) one)
(assert-equal (ackermann-3 one zero) two)
(assert-equal (ackermann-3 zero one) two)
(assert-equal (ackermann-3 two zero) three)
(assert-equal (ackermann-3 one one) three)
(assert-equal (ackermann-3 zero two) three)
(assert-equal (ackermann-3 three zero) five)
(assert-equal (ackermann-3 two one) five)
(assert-equal (ackermann-3 one two) four)
(assert-equal (ackermann-3 zero three) four)

;; TODO fail:

;; (assert-equal ackermann-1 ackermann-2)
;; (assert-equal ackermann-1 ackermann-3)
;; (assert-equal ackermann-2 ackermann-3)
