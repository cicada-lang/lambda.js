---
title: the right way to handle recursion
date: 2025-06-21
---

当初之所以实现这个练习项目，
是因为看了 "the little typer" 之后，
想要用 untyped lambda 演算来了练习 normalization。

"the little typer" 实现 normalization 的方式是 NbE，
这种方式不支持递归函数，
或者任何其他递归定义的东西。

因此，这里的笔记有很多在讨论如何处理递归函数。

其实，正确的处理递归函数之间的结构性等价关系的方法，
在 roberto amadio 和 luca cardelli 的 1993 年论文中
-- "subtyping recursive types"。

[2025-07-15] 上面这篇论文，
可以处理递归类型之间的等价，
但是没法处理递归函数之间的等价。
因为 type constructor 在递归定义中的参数不变，
但是函数在递归定义中的参数是变化的。

比如定义 `even?` 和 `odd?` 的两种方式。

（1）相互递归：

```scheme
(define (even? n)
  (if (zero? n) true
      (odd? (sub1 n))))

(define (odd? n)
  (if (zero? n) false
      (even? (sub1 n))))
```

（2）直接递归：

```scheme
(define (even? n)
  (if (zero? n) true
      (if (zero? (sub1 n)) false
          (even? (sub1 (sub1 n))))))

(define (odd? n)
  (if (zero? n) false
      (if (zero? (sub1 n)) true
          (odd? (sub1 (sub1 n))))))
```

假设要判断（1）和（2）中的 `even?` 等价，
经过 partial evaluation，需要判断：

```scheme
(== (odd? (sub1 n))
    (if (zero? (sub1 n)) false
        (even? (sub1 (sub1 n)))))
```

好像这里展开 `odd?` 就可以了，
也就是说，如果能把所有相互递归函数都 inline 成直接递归函数，
这种情况就可以处理。

递归定义的函数，与 lambda 的等价判断，直接展开递归函：

```scheme
(== even?
    (lambda (n)
      (if (zero? n) true
          (if (zero? (sub1 n)) false
              (even? (sub1 (sub1 n)))))))
```

带有错位 wrap 的等价判断。
假设递归函数 `f` 的 fixpoint wrapper 是 `F`，
`f = (Y F)`。

下面是三种对 `f` 的等价的递归定义：

```scheme
(define f1 (F f1))
(define f2 (F (F f2)))
(define f3 (F (F (F f3))))
```

看具体的例子 `f` 是 `length`，
`F` 是 `length-wrap` 。

正常的递归定义：

```scheme
(define (length l)
  (if (null? l) zero
    (add1 (length (cdr l)))))
```

```scheme
(define (length-wrap length)
  (lambda (l)
    (if (null? l) zero
        (add1 (length (cdr l))))))

(define length-1 (length-wrap length-1))
(define length-1
  (lambda (l)
    (if (null? l) zero
        (add1 (length-1 (cdr l))))))

(define length-2 (length-wrap (length-wrap length-2)))
(define length-2
  (lambda (l)
    (if (null? l) zero
        (add1 ((lambda (l)
                 (if (null? l) zero
                     (add1 (length-2 (cdr l))))) (cdr l))))))
(define length-2
  (lambda (l)
    (if (null? l) zero
        (add1 (if (null? (cdr l)) zero
                  (add1 (length-2 (cdr (cdr l)))))))))

(define length-3 (length-wrap (length-wrap (length-wrap length-3))))
(define length-3
  (lambda (l)
    (if (null? l) zero
        (add1 (if (null? (cdr l)) zero
                  (add1 (if (null? (cdr (cdr l))) zero
                            (add1 (length-3 (cdr (cdr (cdr l))))))))))))
```

以 `length-2` 和 `length-3` 为例。

如果能形成如下判断，就可以利用 luca 论文里的技巧：

```scheme
(== length-2
    (length-wrap length-3))
```

但是，如果看实际展开后的判断，
如果在递归调用的时候 delay，就会形成判断：

```scheme
(== (length-2 (cdr (cdr l)))
    (if (null? (cdr (cdr l))) zero
        (add1 (length-3 (cdr (cdr (cdr l)))))))
```

这里不能用 luca 论文里的技巧，
因为 `list-t` 递归调用时参数不变，
但是这里每次递归调用，
参数都会多一层 `(cdr (cdr ...))`，
或 `(cdr (cdr (cdr ...)))`。

一般情况下，我们是没法从第二种情况推出来 `length-wrap` 的。

那么 "the right way to handle recursion" 究竟是什么呢？
也许是遇到带有递归函数的等价判断，
不要做 partial evaluation，直接放弃。

但是 dependent type 允许这种处理方式吗？

允许，因为这只是减少了基础等词所能判断的等价，
不影响对一般等价的证明，比如：

```scheme
(lambda (x y x) (add x (add y z)))
(lambda (x y x) (add (add x y) z))
```

这种等价是需要证明的。

只要接受，一般递归函数的等价，无法自动判断，
也是需要证明的，就可以了。

我们甚至还可以用 readback，
只要在直接递归的地方停下，
类似 lisp 中 print 带有 circle 的 list。
