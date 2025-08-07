(import "bool.lisp" true false if)
(import "nat-church.lisp" sub1 zero?)

(define (even? n)
  (if (zero? n) true
      (odd? (sub1 n))))

(define (odd? n)
  (if (zero? n) false
      (even? (sub1 n))))

(define (direct-even? n)
  (if (zero? n) true
      (if (zero? (sub1 n))
        false
        (direct-even? (sub1 (sub1 n))))))

(define (direct-odd? n)
  (if (zero? n) false
      (if (zero? (sub1 n))
        true
        (direct-odd? (sub1 (sub1 n))))))
