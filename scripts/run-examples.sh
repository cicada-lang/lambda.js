#!/usr/bin/env sh

bin="node ./lib/main.js run"
ext=lisp

for example in $(find examples -name "*.${ext}" -not -name "*.test.${ext}" -not -name "*.error.${ext}" -not -name "*.play.${ext}" -not -name "*.benchmark.${ext}"); do
    echo "[run] $example"
    ${bin} $example
done

for example in $(find examples -name "*.test.${ext}"); do
    echo "[out] $example"
    ${bin} $example > $example.out
done

for example in $(find examples -name "*.error.${ext}"); do
    echo "[err] $example"
    ${bin} $example > $example.err || true
done
