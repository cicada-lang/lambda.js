(define (id x) x)

;; eta-equivalence
(assert-equal
  (lambda (f) f)
  (lambda (f) (lambda (x) (f x))))

(assert-equal
  ((lambda (f) f) id)
  ((lambda (f) (lambda (x) (f x))) id))

(assert-equal id (lambda (x) x))
(assert-equal id (lambda (x) (id x)))
(assert-equal id ((lambda (f) (lambda (x) (f x))) id))
