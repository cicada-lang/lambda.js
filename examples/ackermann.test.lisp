(import zero one two three "nat-church.lisp")
(import ackermann ackermann-wrap "ackermann.lisp")

(assert-equal (ackermann zero zero) one)
(assert-equal (ackermann one zero) two)
(assert-equal (ackermann zero one) two)

ackermann-wrap

;; TODO fail:

;; ackermann
;; (ackermann-wrap ackermann)

;; TODO fail:

;; (ackermann one one)
;; (ackermann one two)
;; (ackermann two one)
