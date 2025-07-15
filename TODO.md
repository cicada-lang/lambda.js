`ReadbackCtx` as simple type
merge file `readbackNeutral`

`EquivalentCtx` as simple type
merge file `equivalentNeutral`

rename `Lambda`'s `name` to `variableName`
Lambda has optional `definedName`

rename `Lazy` `cache` to `value`

`readback` handle recursive circle

implement `equivalent` by `readback`
