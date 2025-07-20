(import zero add1 sub1 zero? "nat-church.lisp")
(import one two "nat-church.lisp")
(import if "bool.lisp")

(define (ackermann m n)
  (if (zero? m)
    (add1 n)
    (if (zero? n)
      (ackermann (sub1 m) one)
      (ackermann (sub1 m) (ackermann m n)))))

(define ackermann-wrap
  (lambda (ackermann)
    (lambda (m n)
      (if (zero? m)
        (add1 n)
        (if (zero? n)
          (ackermann (sub1 m) one)
          (ackermann (sub1 m) (ackermann m n)))))))

(assert-equal ackermann ackermann)
(assert-equal ackermann (ackermann-wrap ackermann))
(assert-equal ackermann (ackermann-wrap (ackermann-wrap ackermann)))

(define (ackermann-1 m n)
  ((ackermann-wrap ackermann-1)
   m n))

(define (ackermann-2 m n)
  ((ackermann-wrap
    (ackermann-wrap ackermann-2))
   m n))

(define (ackermann-3 m n)
  ((ackermann-wrap
    (ackermann-wrap
     (ackermann-wrap ackermann-3)))
   m n))

;; TODO fail:

;; (assert-equal ackermann-1 ackermann-2)
;; (assert-equal ackermann-1 ackermann-3)
;; (assert-equal ackermann-2 ackermann-3)
