(define (S f g x) ((f x) (g x)))
(define (K x y) x)
(define (I x) x)

(define (C f x y) (f y x))
(define (B f g x) (f (g x)))
