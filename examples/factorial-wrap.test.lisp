(import zero? add mul sub1 "nat-church.lisp")
(import zero one two three four five "nat-church.lisp")
(import if true false "bool.lisp")
(import Y turing "fixpoint.lisp")

(import factorial-wrap "factorial-wrap.lisp")

(assert-equal ((Y factorial-wrap) zero) one)
(assert-equal ((Y factorial-wrap) one) one)
(assert-equal ((Y factorial-wrap) two) two)
(assert-equal ((Y factorial-wrap) three) (mul three two))
(assert-equal ((Y factorial-wrap) four) (mul four (mul three two)))
(assert-equal ((Y factorial-wrap) five) (mul five (mul four (mul three two))))

(assert-equal ((turing factorial-wrap) zero) one)
(assert-equal ((turing factorial-wrap) one) one)
(assert-equal ((turing factorial-wrap) two) two)
(assert-equal ((turing factorial-wrap) three) (mul three two))
(assert-equal ((turing factorial-wrap) four) (mul four (mul three two)))
(assert-equal ((turing factorial-wrap) five) (mul five (mul four (mul three two))))

(import factorial "factorial-wrap.lisp")

(assert-equal factorial (factorial-wrap factorial))
(assert-equal factorial (factorial-wrap (factorial-wrap factorial)))

(assert-equal
  (lambda (factorial)
    (factorial-wrap
     (factorial-wrap
      (factorial-wrap
       factorial))))
  (lambda (factorial)
    (lambda (n)
      (if (zero? n)
        one
        (mul
         n
         ((lambda (n)
            (if (zero? n)
              one
              (mul
               n
               ((lambda (n)
                  (if (zero? n)
                    one
                    (mul
                     n
                     (factorial
                      (sub1 n)))))
                (sub1 n)))))
          (sub1 n)))))))

(assert-equal
  (factorial-wrap
   (factorial-wrap
    (factorial-wrap
     factorial)))
  (lambda (n)
    (if (zero? n)
      one
      (mul
       n
       ((lambda (n)
          (if (zero? n)
            one
            (mul
             n
             ((lambda (n)
                (if (zero? n)
                  one
                  (mul
                   n
                   (factorial
                    (sub1 n)))))
              (sub1 n)))))
        (sub1 n))))))
