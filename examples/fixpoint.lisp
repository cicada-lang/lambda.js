;; If lazy evaluation is NOT supported:

(define (Y f)
  ((lambda (u) (u u))
   (lambda (x) (f (lambda (t) ((x x) t))))))

;; If lazy evaluation is supported:

;; (define (Y f)
;;   ((lambda (x) (f (x x)))
;;    (lambda (x) (f (x x)))))

;; Another function to find fixpoint is `turing`,
;; which also need lazy evaluation:

(define (turing-half x y) (y (x x y)))
(define turing (turing-half turing-half))
