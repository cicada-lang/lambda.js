(import zero? mul sub1 "nat-church.lisp")
(import one "nat-church.lisp")
(import if "bool.lisp")
(import Y "fixpoint.lisp")

(define factorial (Y factorial-wrap))

(define factorial-wrap
  (lambda (factorial)
    (lambda (n)
      (if (zero? n)
        one
        (mul n (factorial (sub1 n)))))))
