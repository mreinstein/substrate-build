import * as espree from 'espree'
import { marked }  from 'marked'


// Build a pure es module from literate markdown.
export default function buildModule ({ source, translateNpmToUrl }) {
    let scriptContent = ''
    const npmUrl = 'https://cdn.skypack.dev/'
    const npmModuleRegx = RegExp('(^\/)|(^\.\/)|(^\..\/)|(^http)') /** find imports that do not begin with  "/", "./", or "../"   */

    const walkTokens = (token) => {
        if (token.type === 'code') {
            const langParts = token.lang.split(' ')
            const isJavascript = [ 'js', 'javascript' ].indexOf(langParts[0].trim().toLowerCase()) >= 0

            if (!isJavascript)
                return

            try {
                const program = espree.parse(token.text, { ecmaVersion: 9, sourceType: 'module' }) 
                const isExplorable =(langParts[1] === 'explorable')

                if (translateNpmToUrl) { 
                    // find node imports and replace with url for cdn
                    // work from the bottom up to avoid positional index math due to changing the length of the string
                    Object.keys(program.body).reverse().forEach((idx) => {
                        const elem = program.body[idx]
                        if (elem.type === 'ImportDeclaration' && !npmModuleRegx.test(elem.source.value)) {
                            const val = `${npmUrl}${elem.source.value}`;
                            elem.source.value = val
                            elem.source.raw = "\'" + val +"\'"
                            token.text = token.text.slice(0,elem.source.start) + `'${val}'` + token.text.slice(elem.source.end, token.text.length)
                        }
                    });
                }
                
                if (!isExplorable)
                    scriptContent += `${token.text}\n\n`
              
                   

            } catch (er) {
                // omit invalid javascript programs from the actual output
                console.log('oops parsing program', er)
            }

        }
    }

    marked.use({ walkTokens })

    const html = marked(source)

    return scriptContent
}
