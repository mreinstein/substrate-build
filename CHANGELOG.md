# 0.10.0
* switch ecmaVersion from 2018 to 2020 for optional chaining support and nullish coalescing


# 0.9.0
* update marked and espree deps
* remove package-lock.json


# 0.8.0
* remove build step
* require node >= v12.17


# 0.7.1
* use npm hosted rollup-plugin-url-resolve dep


# 0.7.0
* BREAKING: alter parameters to be an argument object
* add `translateNpmToUrl` option to transform npm modules to point at fully qualified CDN URL (skypack for now.)
* update `author` field in `package.json`
* add this changelog


# 0.6.0
* update parser to accept es9 (was es6)
* fix `prepublishOnly` build step


# 0.5.0
* initial commit after re-purposing `substrate-build` to literate programming.
