(assert-same
  (lambda (x) x)
  (lambda (y) y))

(assert-same
  (lambda (x y) (x y))
  (lambda (y x) (y x)))

(assert-not-same
  (lambda (x y) (x y))
  (lambda (x y) (y x)))

(define (id1 x) x)
(define (id2 x) x)

(assert-same id1 id1)
(assert-same id2 id2)
(assert-not-same id1 id2)

(assert-same
  (lambda (x) (id2 x))
  (lambda (x) (id2 x)))

;; partial evaluation for unnamed lambda:
(assert-same
  (lambda (x) ((lambda (x) (id2 x)) x))
  (lambda (x) (id2 x)))

(assert-not-same
  id1
  (lambda (x) (id1 x)))

(assert-not-same
  (lambda (x) (id2 x))
  (lambda (x) (id1 x)))
