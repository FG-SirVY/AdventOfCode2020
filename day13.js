const fs = require('fs')
const EOL = require('os').EOL

let timestamp, busIds

[timestamp, busIds] = fs.readFileSync('input/day13.txt', 'utf-8').split(EOL)

/*
timestamp = parseInt(timestamp)
busIds = busIds.split(',').filter(e => e != 'x').map(i => parseInt(i))

let targetBusId = 0
let waitTime = Number.MAX_SAFE_INTEGER

busIds.forEach(i => {
    const newWaitTime = i - (timestamp % i)

    if (newWaitTime < waitTime) {
        targetBusId = i
        waitTime = newWaitTime
    }
})

console.log(waitTime * targetBusId)
*/

// Part Two

busIds = busIds.split(',').map((i, index) => {
    if (i == 'x')
        return null
    else
        return {
            value: parseInt(i),
            offset: index
        }
}).filter(e => e)

timestamp = 0
let firstMatch = 0
let progressionPerStep = busIds[0].value
let currentIndex = 1

while (true) {
    if ((timestamp + busIds[currentIndex].offset) % busIds[currentIndex].value === 0) {
        if (currentIndex == busIds.length - 1) {
            console.log(timestamp)
            break
        } else if (firstMatch == 0) {
            firstMatch = timestamp
        } else {
            progressionPerStep = timestamp - firstMatch
            firstMatch = 0
            currentIndex++
        }
    }

    timestamp += progressionPerStep
}
