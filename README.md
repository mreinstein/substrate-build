# substrate-build

convert a substrate document into an es module. This is useful in creating build system plugins (rollup, webpack) for consuming substrate documents.


```javascript
import buildModule from 'substrate-build'
import fs from 'fs'


const source = fs.readFileSync('./some-file.explorable.md', 'utf8')
const code = buildModule({ source })

// code is now a string containing a valid javascript module
```
