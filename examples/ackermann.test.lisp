(import zero one two three four five "nat-church.lisp")
(import ackermann ackermann-wrap "ackermann.lisp")

(assert-equal (ackermann zero zero) one)
(assert-equal (ackermann one zero) two)
(assert-equal (ackermann zero one) two)
(assert-equal (ackermann one one) three)
(assert-equal (ackermann one two) four)
(assert-equal (ackermann two one) five)

ackermann-wrap

;; TODO fail:

;; ackermann
;; (ackermann-wrap ackermann)
