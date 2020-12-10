const fs = require('fs')
const EOL = require('os').EOL

const numbers = fs.readFileSync('input/day10.txt', 'utf-8').split(EOL).map(n => parseInt(n))

numbers.sort((a, b) => {
    return a -b
})

/*Part One
let lastNumber = 0
let singleJoltCount = 0
let threeJoltCount = 1

numbers.forEach(n => {
    const delta = n - lastNumber
    if (delta === 1)
        singleJoltCount++
    else if (delta === 3)
        threeJoltCount++

    lastNumber = n
})

console.log(singleJoltCount * threeJoltCount)*/

// Part Two
/*
const differences = [ numbers[0] ]

for (let i = 1; i < numbers.length; i++) {
    differences.push(numbers[i] - numbers[i - 1])
}*/
