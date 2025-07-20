# lambda-lisp.js

An implementation of [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus).

```scheme
(define name body)
(define (name arg ...) body)
(import name ... "./file.scm")
(assert-equal lhs rhs)
(assert-not-equal lhs rhs)

(lambda (name) ret)
(let ((name exp) ...) body)
```

## Usages

### Command line tool

Install it by the following command:

```sh
npm install -g @xieyuheng/lambda-lisp.js
```

The command-line program is called `lambda-lisp.js`.

## Development

```sh
npm install
npm run build
npm run test
```

## License

[GPLv3](LICENSE)
