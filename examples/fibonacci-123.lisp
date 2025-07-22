(import zero zero? add sub1 "nat-church.lisp")
(import one two three four five "nat-church.lisp")
(import if "bool.lisp")

(define (fibonacci-1 n)
  (if (zero? n)
    zero
    (if (zero? (sub1 n))
      one
      (add (fibonacci-1 (sub1 n))
           (fibonacci-1 (sub1 (sub1 n)))))))

(assert-equal (fibonacci-1 zero) zero)
(assert-equal (fibonacci-1 one) one)
(assert-equal (fibonacci-1 two) one)
(assert-equal (fibonacci-1 three) two)
(assert-equal (fibonacci-1 four) three)
(assert-equal (fibonacci-1 five) five)

(define (fibonacci-2 n)
  (if (zero? n)
    zero
    (if (zero? (sub1 n))
      one
      (add (if (zero? (sub1 n))
             zero
             (if (zero? (sub1 (sub1 n)))
               one
               (add (fibonacci-2 (sub1 (sub1 n)))
                    (fibonacci-2 (sub1 (sub1 (sub1 n)))))))
           (fibonacci-2 (sub1 (sub1 n)))))))

(assert-equal (fibonacci-2 zero) zero)
(assert-equal (fibonacci-2 one) one)
(assert-equal (fibonacci-2 two) one)
(assert-equal (fibonacci-2 three) two)
(assert-equal (fibonacci-2 four) three)
(assert-equal (fibonacci-2 five) five)

(define (fibonacci-3 n)
  (if (zero? n)
    zero
    (if (zero? (sub1 n))
      one
      (add (if (zero? (sub1 n))
             zero
             (if (zero? (sub1 (sub1 n)))
               one
               (add (fibonacci-3 (sub1 (sub1 n)))
                    (fibonacci-3 (sub1 (sub1 (sub1 n)))))))
           (if (zero? (sub1 (sub1 n)))
             zero
             (if (zero? (sub1 (sub1 (sub1 n))))
               one
               (add (fibonacci-3 (sub1 (sub1 (sub1 n))))
                    (fibonacci-3 (sub1 (sub1 (sub1 (sub1 n))))))))))))

(assert-equal (fibonacci-3 zero) zero)
(assert-equal (fibonacci-3 one) one)
(assert-equal (fibonacci-3 two) one)
(assert-equal (fibonacci-3 three) two)
(assert-equal (fibonacci-3 four) three)
(assert-equal (fibonacci-3 five) five)

(assert-not-same fibonacci-1 fibonacci-2)

;; TODO fail:

;; (assert-equal fibonacci-1 fibonacci-2)
;; (assert-equal fibonacci-1 fibonacci-3)
;; (assert-equal fibonacci-2 fibonacci-3)
