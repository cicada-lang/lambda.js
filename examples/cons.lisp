;; Temporarily save `car` and `cdr` to a lambda.
;; Later, applying the lambda to a function,
;; is applying this function it to the saved `car` and `cdr`

(define (cons car cdr) (lambda (f) (f car cdr)))
(define (car pair) (pair (lambda (car cdr) car)))
(define (cdr pair) (pair (lambda (car cdr) cdr)))

(import "bool.lisp" true false)

(define (null f) true)
(define (null? pair) (pair (lambda (car cdr) false)))
