> refactor `load` to support circular imports
>
> - if we can support mutually defined recursive function,
>   we should also support circular imports.

`run` should be async
call `run` in `load`
rename `define` to `handleDefine`
extract `handleImport` from `handleDefine`
rename `execute` to `handleEffect`
rename `run/` to `load/`

# lazy evaluation

[problem] we can use `Y`! -- `DelayedApply` can replace `Lazy`? -- what evaluation strategy is this?
[maybe] bring lazy evaluation back
[maybe] remove lazy -- if the new evaluation strategy is good!
