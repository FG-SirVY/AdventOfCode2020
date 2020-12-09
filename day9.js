const fs = require('fs')
const EOL = require('os').EOL

const lines = fs.readFileSync('input/day9.txt', 'utf-8').split(EOL)
const numbers = []

lines.forEach(l => {
    numbers.push(parseInt(l))
})

let value

// Part One

function checkAddNumbers(i) {
    for (let j = i - 25; j < i - 1; j++) {
        for (let k = j + 1; k < i; k++) {
            if (numbers[j] + numbers[k] === numbers[i]) {
                return true
            }
        }
    }
    
    return false
}

for (let i = 25; i < numbers.length; i++) {
    if (!checkAddNumbers(i)) {
        console.log(numbers[i])
        value = numbers[i]
        break
    }
}

// Part Two

function getSmallestPlusLargest(arr) {
    arr.sort((a, b) => {
        return a - b
    })

    return arr[0] + arr[arr.length - 1]
}

for (let j = 2; j <= numbers.length; j++) {
    let sum = 0

    for (let i = 0; i < j; i++) {
        sum += numbers[i]
    }

    if (sum === value) {
        console.log(getSmallestPlusLargest(numbers.slice(0, j)))
        break
    }

    for (let i = 0; i < numbers.length - j; i++) {
        sum -= numbers[i]
        sum += numbers[i + j]

        if (sum === value) {
            console.log(getSmallestPlusLargest(numbers.slice(i + 1, i + j + 1)))
            break
        }
    }
}
