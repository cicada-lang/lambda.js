;; Fixpoint combinator

;; [ [WIKIPEDIA](https://en.wikipedia.org/wiki/Fixed-point_combinator) ]

;; In mathematics, `x` is `f`'s fixpoint if `(f x) = x`.

;; # Y

;; In lambda calculus, we have function `Y`,
;; which can find fixpoint of any function.
;;     (f (Y f)) = (Y f)
;; Once we have `Y`, we can achieve the following recursive definition
;;     f =
;;     (wrap f) =
;;     (wrap (wrap f)) =
;;     (wrap (wrap (wrap ...))) =
;; by non-recursively lambda term.
;;     f =
;;     (Y wrap) =
;;     (wrap (Y wrap)) =
;;     (wrap (wrap (Y wrap))) =
;;     (wrap (wrap (wrap ...)))

;; The following `Y` is one way of defining `Y`.

(define (Y f)
  ((lambda (x) (f (x x)))
   (lambda (x) (f (x x)))))

;; We will have

;; (Y f) =
;; (f ((lambda (x) (f (x x)))
;;     (lambda (x) (f (x x))))) =
;; (f (Y f))

;; # turing

;; Another function to find fixpoint is `turing`.

(define (turing-half x y) (y (x x y)))
(define turing (turing-half turing-half))

;; We will have

;; (turing f) =
;; (turing-half turing-half f) =
;; (f (turing-half turing-half f)) =
;; (f (turing f))
