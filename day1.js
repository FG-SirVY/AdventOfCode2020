const fs = require('fs')

const lines = fs.readFileSync('input/day1.txt', 'utf-8').split(/\r?\n/)

const numbers = []
lines.forEach(line => {
    numbers.push(parseInt(line, 10))
})


/*Part One

for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
        if ((numbers[i] + numbers[j]) == 2020) {
            console.log(numbers[i] * numbers[j])
        }
    }
}*/


// Part Two

for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
        for (let k = j + 1; k < numbers.length; k++) {
            if ((numbers[i] + numbers[j] + numbers[k]) == 2020) {
                console.log(numbers[i] * numbers[j] * numbers[k])
            }
        }
    }
}
