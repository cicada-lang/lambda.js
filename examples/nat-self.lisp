;; Typing Encoding of Natural Number with Self Types

;; # ind-Nat and lambda encoding

;; Remember that `ind-Nat` take `target` as an explicit argument,
;; because we want to infer application of `ind-Nat`.

;; (claim ind-Nat
;;   (Pi ((target Nat)
;;        (motive (-> Nat Type))
;;        (base (motive zero))
;;        (step (Pi ((prev Nat))
;;                (-> (motive prev)
;;                    (motive (add1 prev))))))
;;     (motive target)))

;; (define (ind-Nat target motive base step) (target motive base step))

;; # solve zero

;; We already know what `(ind-Nat zero)` should be,
;; thus we have equation about `zero`,
;; let's try to solve `zero` from this equation.

;; (claim (ind-Nat zero)
;;   (Pi ((motive (-> Nat Type))
;;        (base (motive zero))
;;        (step (Pi ((prev Nat))
;;                (-> (motive prev)
;;                    (motive (add1 prev))))))
;;     (motive zero)))

;; (assert-equal
;;   (ind-Nat zero motive)
;;   (lambda (base step) (zero motive base step))
;;   (lambda (base step) base))

;; (define zero (lambda (motive base step) base))

;; (claim zero
;;   (Pi ((motive (-> Nat Type))
;;        (base (motive zero))
;;        (step (Pi ((prev Nat))
;;                (-> (motive prev)
;;                    (motive (add1 prev))))))
;;     (motive zero)))

;; The type of `zero` is `Nat`, thus we have:

;; (define Nat
;;   (Pi ((motive (-> Nat Type))
;;        (base (motive zero))
;;        (step (Pi ((prev Nat))
;;                (-> (motive prev)
;;                    (motive (add1 prev))))))
;;     (motive target)))

;; But target is a free variable.

;; (define (add1 prev)
;;   (lambda (motive base step)
;;     (step prev (prev motive base step))))

;; (claim add1
;;   (-> Nat Nat)
;;   (Pi ((prev Nat)
;;        (motive (-> Nat Type))
;;        (base (motive zero))
;;        (step (Pi ((prev Nat))
;;                (-> (motive prev)
;;                    (motive (add1 prev))))))
;;     (motive (add1 prev))))

;; # define Nat as a self type

;; It seems we are defining one Nat for each n.
;; Here comes self types.

;; (define Nat
;;   (Self (target)
;;     (Pi ((motive (-> Nat Type))
;;          (base (motive zero))
;;          (step (Pi ((prev Nat))
;;                  (-> (motive prev)
;;                      (motive (add1 prev))))))
;;       (motive target))))

;; # check zero

;; (claim zero Nat)
;; (define zero (lambda (motive base step) base))

;; (type-checking-chart
;;  (check () zero Nat)
;;  (check ()
;;    zero
;;    (Self (target)
;;      (Pi ((motive (-> Nat Type))
;;           (base (motive zero))
;;           (step (Pi ((prev Nat))
;;                   (-> (motive prev)
;;                       (motive (add1 prev))))))
;;        (motive target))))
;;  (check ()
;;    (lambda (motive base step) base)
;;    (Self (target)
;;      (Pi ((motive (-> Nat Type))
;;           (base (motive zero))
;;           (step (Pi ((prev Nat))
;;                   (-> (motive prev)
;;                       (motive (add1 prev))))))
;;        (motive target))))
;;  (check ((target Nat zero))
;;    (lambda (motive base step) base)
;;    (Pi ((motive (-> Nat Type))
;;         (base (motive zero))
;;         (step (Pi ((prev Nat))
;;                 (-> (motive prev)
;;                     (motive (add1 prev))))))
;;      (motive target)))
;;  (check ((target Nat zero)
;;          (motive (-> Nat Type))
;;          (base (motive zero))
;;          (step (Pi ((prev Nat))
;;                  (-> (motive prev)
;;                      (motive (add1 prev))))))
;;    base
;;    (motive target))
;;  (lookup-and-equal-type
;;   ((target Nat zero)
;;    (motive (-> Nat Type))
;;    (base (motive zero))
;;    (step (Pi ((prev Nat))
;;            (-> (motive prev)
;;                (motive (add1 prev))))))
;;   base
;;   (motive target))
;;  (equal-type
;;   ((target Nat zero)
;;    (motive (-> Nat Type))
;;    (base (motive zero))
;;    (step (Pi ((prev Nat))
;;            (-> (motive prev)
;;                (motive (add1 prev))))))
;;   (motive zero)
;;   (motive target))
;;  (equal-type
;;   ((target Nat zero)
;;    (motive (-> Nat Type))
;;    (base (motive zero))
;;    (step (Pi ((prev Nat))
;;            (-> (motive prev)
;;                (motive (add1 prev))))))
;;   (motive zero)
;;   (motive zero)))

;; # check add1

;; (claim add1 (-> Nat Nat))
;; (define add1
;;   (lambda (prev)
;;     (lambda (motive base step)
;;       (step prev (prev motive base step)))))

;; (type-checking-chart
;;  (check ()
;;    add1
;;    (-> Nat Nat))
;;  (check ()
;;    (lambda (prev)
;;      (lambda (motive base step)
;;        (step prev (prev motive base step))))
;;    (-> Nat Nat))
;;  (check ((prev Nat))
;;    (lambda (motive base step)
;;      (step prev (prev motive base step)))
;;    Nat)
;;  (check ((prev Nat))
;;    (lambda (motive base step)
;;      (step prev (prev motive base step)))
;;    (Self (target)
;;      (Pi ((motive (-> Nat Type))
;;           (base (motive zero))
;;           (step (Pi ((prev Nat))
;;                   (-> (motive prev)
;;                       (motive (add1 prev))))))
;;        (motive target))))
;;  (check ((prev Nat)
;;          (target Nat (lambda (motive base step)
;;                        (step prev (prev motive base step)))))
;;    (lambda (motive base step)
;;      (step prev (prev motive base step)))
;;    (Pi ((motive (-> Nat Type))
;;         (base (motive zero))
;;         (step (Pi ((prev Nat))
;;                 (-> (motive prev)
;;                     (motive (add1 prev))))))
;;      (motive target)))
;;  (check ((prev Nat)
;;          (target Nat (lambda (motive base step)
;;                        (step prev (prev motive base step))))
;;          (motive (-> Nat Type))
;;          (base (motive zero))
;;          (step (Pi ((prev Nat))
;;                  (-> (motive prev)
;;                      (motive (add1 prev))))))
;;    (step prev (prev motive base step))
;;    (motive target))
;;  (check ((prev Nat)
;;          (target Nat (lambda (motive base step)
;;                        (step prev (prev motive base step))))
;;          (motive (-> Nat Type))
;;          (base (motive zero))
;;          (step (Pi ((prev Nat))
;;                  (-> (motive prev)
;;                      (motive (add1 prev))))))
;;    ;; (check (...) (prev motive base step) (motive prev))
;;    (motive (add1 prev))
;;    (motive target))
;;  (check ((prev Nat)
;;          (target Nat (lambda (motive base step)
;;                        (step prev (prev motive base step))))
;;          (motive (-> Nat Type))
;;          (base (motive zero))
;;          (step (Pi ((prev Nat))
;;                  (-> (motive prev)
;;                      (motive (add1 prev))))))
;;    (motive ((lambda (prev)
;;               (lambda (motive base step)
;;                 (step prev (prev motive base step))))
;;             prev))
;;    (motive (lambda (motive base step)
;;              (step prev (prev motive base step)))))
;;  (check ((prev Nat)
;;          (target Nat (lambda (motive base step)
;;                        (step prev (prev motive base step))))
;;          (motive (-> Nat Type))
;;          (base (motive zero))
;;          (step (Pi ((prev Nat))
;;                  (-> (motive prev)
;;                      (motive (add1 prev))))))
;;    (motive (lambda (motive base step)
;;              (step prev (prev motive base step))))
;;    (motive (lambda (motive base step)
;;              (step prev (prev motive base step))))))
