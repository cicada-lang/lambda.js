(import "nat-church.lisp" zero? mul sub1)
(import "nat-church.lisp" one)
(import "bool.lisp" if)
(import "fixpoint.lisp" Y)

(define factorial (Y factorial-wrap))

(define factorial-wrap
  (lambda (factorial)
    (lambda (n)
      (if (zero? n)
        one
        (mul n (factorial (sub1 n)))))))
