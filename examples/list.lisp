(define nil
  (lambda (nil-case li-case)
    nil-case))

(define (li head tail)
  (lambda (nil-case li-case)
    (li-case head tail
      (tail nil-case li-case))))

(define (rec-List target nil-case li-case)
  (target nil-case li-case))

(import zero add1 "./nat-church.lisp")

(define (length l)
  (rec-List l
    zero
    (lambda (head target almost)
      (add1 almost))))

(import true "./boolean.lisp")

(assert-equal (length nil) zero)
(assert-equal (length (li true nil)) (add1 zero))
(assert-equal (length (li true (li true nil))) (add1 (add1 zero)))

(define (append left right)
  (rec-List left
    right
    (lambda (head target almost)
      (li head almost))))

(assert-equal (append nil nil) nil)
(assert-equal (append nil (li true nil)) (li true nil))
(assert-equal (append (li true nil) nil) (li true nil))
(assert-equal (append (li true nil) (li true nil)) (li true (li true nil)))
(assert-equal (append (li true (li true nil))
                      (li true (li true nil)))
              (li true (li true (li true (li true nil)))))
