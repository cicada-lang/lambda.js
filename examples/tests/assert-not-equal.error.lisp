(assert-not-equal
  (lambda (x y) (x y))
  (lambda (y x) (y x)))
