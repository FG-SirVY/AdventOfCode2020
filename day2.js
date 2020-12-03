const fs = require('fs')

const lines = fs.readFileSync('input/day2.txt', 'utf-8').split(/\r?\n/)

/*Part One

let validPwCount = 0
const exp = /(\d+)-(\d+) (.): (.*)/

lines.forEach(line => {
    const matches = exp.exec(line)
    const min = matches[1]
    const max = matches[2]
    const char = matches[3]
    const pass = matches[4]

    let numFound = 0

    pass.split('').forEach((c) => {
        if (c == char)
            numFound++
    })

    if (numFound >= min && numFound <= max)
        validPwCount++
})

console.log(validPwCount)
*/


//Part Two

let validPwCount = 0
const exp = /(\d+)-(\d+) (.): (.*)/

lines.forEach(line => {
    const matches = exp.exec(line)
    const a = matches[1]
    const b = matches[2]
    const char = matches[3]
    const pass = matches[4]

    if ((pass[a - 1] == char || pass[b - 1] == char) && pass[a - 1] != pass[b - 1]) {
        validPwCount++
    }        
})

console.log(validPwCount)
