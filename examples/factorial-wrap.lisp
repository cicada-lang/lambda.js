(import zero? add mul sub1 "./nat-church.lisp")
(import zero one two three four "./nat-church.lisp")
(import if true false "./boolean.lisp")
(import Y turing "./fix.lisp")

;; (claim factorial-wrap (-> (-> Nat Nat) (-> Nat Nat)))
;; (claim (Y factorial-wrap) (-> Nat Nat))
;; (claim Y (nu (A) (-> (-> A A) A)))

(define factorial-wrap
  (lambda (factorial)
    (lambda (n)
      (if (zero? n)
        one
        (mul n (factorial (sub1 n)))))))

factorial-wrap

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

(assert-equal ((Y factorial-wrap) zero) one)
(assert-equal ((Y factorial-wrap) one) one)
(assert-equal ((Y factorial-wrap) two) two)
(assert-equal ((Y factorial-wrap) three) (mul three two))
(assert-equal ((Y factorial-wrap) four) (mul four (mul three two)))

(assert-equal ((turing factorial-wrap) zero) one)
(assert-equal ((turing factorial-wrap) one) one)
(assert-equal ((turing factorial-wrap) two) two)
(assert-equal ((turing factorial-wrap) three) (mul three two))
(assert-equal ((turing factorial-wrap) four) (mul four (mul three two)))

(define factorial (Y factorial-wrap))

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))
