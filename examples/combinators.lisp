(define (S f g x) ((f x) (g x)))
(define (K x y) x)
(define (I x) x)

(I)
(K I)
(S K I)

(define (C f x y) (f y x))
(define (B f g x) (f (g x)))

(assert-equal (K I) (C K))

(assert-equal (S K) (K I))
