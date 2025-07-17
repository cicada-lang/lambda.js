`Lambda` has optional `definedName`
`readback` handle recursive function
`equivalent` handle recursive function

[maybe] call `run` in `load` -- this will forbid circular imports

- if we can support mutually defined recursive function,
  we should also support circular imports.
- if so, this task should be: refactor `load` to support circular imports
