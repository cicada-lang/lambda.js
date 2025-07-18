# lambda.js

An interpreter of [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus),
that implements call-by-need lazy evaluation.

```scheme
(define name body)
(define (name arg ...) body)
(import name ... "./file.scm")
(assert-equal exp ...)
(assert-not-equal exp ...)

(lambda (name) ret)
(let ((name exp) ...) body)
```

## Usages

### Command line tool

Install it by the following command:

```sh
npm install -g @xieyuheng/lambda.js
```

The command-line program is called `lambda.js`.

## Development

```sh
npm install
npm run build
npm run test
```

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
