;; Encoding Cons

;; # Cons

;; Temporarily save `car` and `cdr` to a lambda.

;; Later, applying the lambda to a function,
;; is applying this function it to the saved `car` and `cdr`

(define (cons car cdr) (lambda (f) (f car cdr)))
(define (car pair) (pair (lambda (car cdr) car)))
(define (cdr pair) (pair (lambda (car cdr) cdr)))

;; # Null

(import true false "./boolean.lisp")

(define (null f) true)
(define (null? pair) (pair (lambda (car cdr) false)))

;; ## Tests

(assert-equal
  (null? null)
  (null (lambda (car cdr) false))
  true)

(assert-equal
  (null? (cons null null))
  false)

(assert-equal
  (null? (cons null null))
  ((cons null null) (lambda (car cdr) false))
  ((lambda (car cdr) false) null null)
  false)

(assert-equal
  (null? (car (cons null null)))
  (null? (cdr (cons null null)))
  (null? null)
  true)
