(import zero one two three "nat-church.lisp")
(import ackermann "ackermann.lisp")

(assert-equal (ackermann zero zero) one)
(assert-equal (ackermann one zero) two)
(assert-equal (ackermann zero one) two)

;; TODO fail:

;; (ackermann one one)
;; (ackermann one two)
;; (ackermann two one)
