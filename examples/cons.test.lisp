(import cons car cdr null null? "cons.lisp")

(import true false "bool.lisp")

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
