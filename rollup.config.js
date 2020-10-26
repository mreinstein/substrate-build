import urlResolve from 'rollup-plugin-url-resolve'

 
export default {
    input: 'build-module.js',
    output: {
        file: 'build-module.esm.js',
        format: 'es',
        sourcemap: false
    },
    plugins: [
        urlResolve()
    ]
}
