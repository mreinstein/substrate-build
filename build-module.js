import espree from 'https://cdn.skypack.dev/espree'
import marked from 'https://cdn.skypack.dev/marked'


// Build a pure es module from literate markdown.
export default function buildModule (options) {
    let scriptContent = ''
    const {source, translateNpmToUrl} = options
    const npmUrl = 'https://cdn.skypack.dev/'
    const reg = RegExp('(^\/)|(^\.\/)|(^\..\/)|(^http)') /** find imports that do not begin with  "/", "./", or "../"   */

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
                    let indexPositionChange = 0;
                    program.body.forEach((elem) => {
                        if (elem.type === 'ImportDeclaration' && !reg.test(elem.source.value)) {
                            const val = `${npmUrl}${elem.source.value}`;
                            elem.source.value = val
                            elem.source.raw = "\'" + val +"\'"

                            const positionChange = elem.source.end - elem.source.start // we are about to change the text length - record the original length
                            token.text = token.text.slice(0,elem.source.start + indexPositionChange) + `'${val}'` + token.text.slice(elem.source.end + indexPositionChange, token.text.length)
                            indexPositionChange += val.length - positionChange + 2 // we are changing the text length by this much + 2 single quotes
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
