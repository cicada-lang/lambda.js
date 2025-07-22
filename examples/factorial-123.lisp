(import zero? add mul sub1 "nat-church.lisp")
(import zero one two three four "nat-church.lisp")
(import if true false "bool.lisp")

(define (factorial-1 n)
  (if (zero? n)
    one
    (mul
     n
     (factorial-1 (sub1 n)))))

(assert-equal (factorial-1 zero) one)
(assert-equal (factorial-1 one) one)
(assert-equal (factorial-1 two) two)
(assert-equal (factorial-1 three) (mul three two))
(assert-equal (factorial-1 four) (mul four (mul three two)))

(define (factorial-2 n)
  (if (zero? n)
    one
    (mul
     n
     (if (zero? (sub1 n))
       one
       (mul
        (sub1 n)
        (factorial-2 (sub1 (sub1 n))))))))

(assert-equal (factorial-2 zero) one)
(assert-equal (factorial-2 one) one)
(assert-equal (factorial-2 two) two)
(assert-equal (factorial-2 three) (mul three two))
(assert-equal (factorial-2 four) (mul four (mul three two)))

(define (factorial-3 n)
  (if (zero? n)
    one
    (mul
     n
     (if (zero? (sub1 n))
       one
       (mul
        (sub1 n)
        (if (zero? (sub1 (sub1 n)))
          one
          (mul
           (sub1 (sub1 n))
           (factorial-3 (sub1 (sub1 (sub1 n)))))))))))

(assert-equal (factorial-3 zero) one)
(assert-equal (factorial-3 one) one)
(assert-equal (factorial-3 two) two)
(assert-equal (factorial-3 three) (mul three two))
(assert-equal (factorial-3 four) (mul four (mul three two)))

(assert-not-same factorial-1 factorial-2)
(assert-not-same factorial-1 factorial-3)
(assert-not-same factorial-2 factorial-3)

(assert-equal factorial-1 factorial-2)
(assert-equal factorial-1 factorial-3)
(assert-equal factorial-2 factorial-3)
