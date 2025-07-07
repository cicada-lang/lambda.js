;; Boolean

;; # True and False

(define (true t f) t)
(define (false t f) f)

;; # Logical connectives

(define (if p t f) (p t f))

(define (and x y) (if x y false))
(define (or x y) (if x true y))
(define (not x) (if x false true))

;; ## Tests

(assert-equal (and true false) false)
(assert-equal (or true false) true)
(assert-equal (not true) false)
(assert-equal (not (not true)) true)

(assert-equal
  (lambda (x) (not (not true)))
  (lambda (x) true))
