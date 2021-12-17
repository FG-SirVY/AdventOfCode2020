const fs = require('fs')
const EOL = require('os').EOL

const numbers = fs.readFileSync('input/day10_alt.txt', 'utf-8').split(EOL).map(n => parseInt(n))

numbers.sort((a, b) => {
    return a - b
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


function chooseNext(numbers, index) {
    let count = 0
    let threshold = numbers[index]
    index--
    while (index > 0 && threshold - numbers[index] < 4) {
        count += chooseNext(numbers, index)
        index--
    }

    return count
}

numbers.unshift(0)
numbers.push(numbers[numbers.length - 1] + 3)

console.log(chooseNext(numbers, numbers.length - 1))
