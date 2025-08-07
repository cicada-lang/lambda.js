(import "nat-church.lisp" zero zero? add sub1)
(import "nat-church.lisp" one)
(import "bool.lisp" if)

(define (fibonacci n)
  (if (zero? n)
    zero
    (if (zero? (sub1 n))
      one
      (add (fibonacci (sub1 n))
           (fibonacci (sub1 (sub1 n)))))))
