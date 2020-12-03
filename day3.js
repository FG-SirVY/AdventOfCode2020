const fs = require('fs')

const lines = fs.readFileSync('input/day3.txt', 'utf-8').split(/\r?\n/)
const lineLength = lines[0].length

/* Part One
let numTrees = 0
let currentIndex = 0

lines.forEach(element => {
    if (element.charAt(currentIndex) === '#')
        numTrees++
    
    currentIndex += 3

    if (currentIndex >= lineLength)
        currentIndex  %= lineLength
})

console.log(numTrees)*/

function checkSlope(right, down) {
    let numTrees = 0
    let currentIndex = 0

    for (let i = 0; i < lines.length; i += down) {
        const field = lines[i]

        if (field.charAt(currentIndex) === '#')
            numTrees++
        
        currentIndex += right

        if (currentIndex >= lineLength)
            currentIndex  %= lineLength
    }

    return numTrees
}

let numTrees = 1
numTrees *= checkSlope(1, 1)
numTrees *= checkSlope(3, 1)
numTrees *= checkSlope(5, 1)
numTrees *= checkSlope(7, 1)
numTrees *= checkSlope(1, 2)

console.log(numTrees)
