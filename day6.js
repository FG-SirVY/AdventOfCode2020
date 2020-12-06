const fs = require('fs')
const EOL = require('os').EOL

const answers = fs.readFileSync('input/day6.txt', 'utf-8').split(EOL)


/* Part One
const yesArray = []
for (let i = 0; i < 26; i++) {
    yesArray.push(false)
}

function resetYesArray(arr) {
    let yesCounter = 0

    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            yesCounter++
            arr[i] = false
        }
    }

    return yesCounter
}

let numAnswers = 0

answers.forEach(a => {
    if (a.length === 0) {
        numAnswers += resetYesArray(yesArray)
        return
    }

    for (let c of a) {
        yesArray[c.charCodeAt(0) - 'a'.charCodeAt(0)] = true
    }
})

numAnswers += resetYesArray(yesArray)

console.log(numAnswers)
*/

const countArray = []
for (let i = 0; i < 26; i++) {
    countArray.push(0)
}

function resetYesArray(arr, acceptLength) {
    let counter = 0

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === acceptLength) {
            counter++
        }

        arr[i] = 0
    }

    return counter
}

let numAnswers = 0
let numPeople = 0

answers.forEach(a => {
    if (a.length === 0) {
        numAnswers += resetYesArray(countArray, numPeople)
        numPeople = 0
        return
    }

    numPeople++

    for (let c of a) {
        countArray[c.charCodeAt(0) - 'a'.charCodeAt(0)]++
    }
})

numAnswers += resetYesArray(countArray, numPeople)

console.log(numAnswers)
