(define nil
  (lambda (nil-case li-case)
    nil-case))

(define (li head tail)
  (lambda (nil-case li-case)
    (li-case head tail
      (tail nil-case li-case))))

(define (rec-List target nil-case li-case)
  (target nil-case li-case))

(import "nat-church.lisp" zero add1)

(define (length l)
  (rec-List l
    zero
    (lambda (head target almost)
      (add1 almost))))

(define (append left right)
  (rec-List left
    right
    (lambda (head target almost)
      (li head almost))))
