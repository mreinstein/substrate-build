# substrate-build

convert a substrate document into an es module. This is useful in creating build system plugins (rollup, webpack) for consuming substrate documents.


```javascript
import buildModule from 'substrate-build'
import fs from 'fs'


const inputFile = fs.readFileSync('./some-file.explorable.md', 'utf8')
const code = buildModule(inputFile)

// code is now a string containing a valid javascript module
```
