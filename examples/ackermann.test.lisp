(import "nat-church.lisp" zero add1 sub1 zero?)
(import "nat-church.lisp" one two three four five)
(import "bool.lisp" if)

(import "ackermann.lisp" ackermann)

ackermann

(assert-equal (ackermann zero zero) one)
(assert-equal (ackermann one zero) two)
(assert-equal (ackermann zero one) two)
(assert-equal (ackermann two zero) three)
(assert-equal (ackermann one one) three)
(assert-equal (ackermann zero two) three)
(assert-equal (ackermann three zero) five)
(assert-equal (ackermann two one) five)
(assert-equal (ackermann one two) four)
(assert-equal (ackermann zero three) four)

(assert-equal
  ackermann
  (lambda (m n)
    (if (zero? m)
      (add1 n)
      (if (zero? n)
        (ackermann (sub1 m) one)
        (ackermann (sub1 m) (ackermann m (sub1 n)))))))

(assert-equal
  ackermann
  (lambda (m n)
    (if (zero? m)
      (add1 n)
      (if (zero? n)
        (ackermann (sub1 m) one)
        ((lambda (m n)
           (if (zero? m)
             (add1 n)
             (if (zero? n)
               (ackermann (sub1 m) one)
               (ackermann (sub1 m) (ackermann m (sub1 n))))))
         (sub1 m)
         (ackermann m (sub1 n)))))))
