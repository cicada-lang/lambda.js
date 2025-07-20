(import true false if "bool.lisp")
(import sub1 zero? "nat-church.lisp")

(define (even? n)
  (if (zero? n) true
      (odd? (sub1 n))))

(define (odd? n)
  (if (zero? n) false
      (even? (sub1 n))))
