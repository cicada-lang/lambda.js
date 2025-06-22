(define (id x) x)

;; NOTE We do not have type-directed eta,
;;   for example, `f` is not equal to `(lambda (x) (f x))`,
;;   because we do not know the type of `f`.
(assert-not-equal
  (lambda (f) f)
  (lambda (f) (lambda (x) (f x))))

(assert-equal
  ((lambda (f) f) id)
  ((lambda (f) (lambda (x) (f x))) id))

(assert-equal
  ((lambda (f) (lambda (x) (f x))) id)
  (lambda (x) (id x))
  (lambda (x) x))
