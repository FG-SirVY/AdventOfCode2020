const fs = require('fs')
const EOL = require('os').EOL

const passes = fs.readFileSync('input/day5.txt', 'utf-8').split(EOL)

let highestId = 0

function getIndex(slice, lowerIndicator, min, max) {
    if (slice.length > 0) {
        if (slice.charAt(0) == lowerIndicator)
            return getIndex(slice.slice(1), lowerIndicator, min, min + ((max - min - 1) / 2))
        else
            return getIndex(slice.slice(1), lowerIndicator, min + ((max - min + 1) / 2), max)
    } else {
        return min
    }
}

function getSeatId(str) {
    return 8 * getIndex(str.slice(0, 7), 'F', 0, 127) + getIndex(str.slice(7), 'L', 0, 7)
}

/*
Part One
passes.forEach(p => {
    const id = getSeatId(p.trim())

    if (id > highestId)
        highestId = id
})

console.log(highestId)
*/


// Part Two

const seats = []
passes.forEach(p => {
    seats.push(getSeatId(p.trim()))
})
seats.sort((a, b) => {
    return a - b
})

let lastNumber
seats.forEach((n) => {
    if (n > lastNumber + 1) {
        console.log(n - 1)
    }

    lastNumber = n
})
