const fs = require('fs')
const EOL = require('os').EOL

const lines = fs.readFileSync('input/day14.txt', 'utf-8').split(EOL)

let mask = ''
for (let i = 0; i < 36; i++) {
    mask += 'X'
}


//const arr = []

/* Part One
lines.forEach(l => {
    let target, value
    [target, value] = l.split(' = ')

    if (target == 'mask') {
        mask = value
    } else {
        const index = parseInt(target.substr(target.indexOf('[') + 1, target.indexOf(']')))
        value = BigInt(parseInt(value))

        for (let i = 0; i < 36; i++) {
            if (mask.charAt(35 - i) != 'X') {
                if (mask.charAt(35 - i) == '0') {
                    value &= ~(1n << BigInt(i))
                } else {
                    value |= (1n << BigInt(i))
                }
            }
        }

        arr[index] = value
    }
})

console.log(arr.reduce((acc, val) => acc + val, BigInt(0)))
*/

// Part Two

const arr = new Map()

let index = 0

function setValue(mem, value, startIndex) {
    if (startIndex == 0)
        index++

    if (startIndex == 36) {
        let target = BigInt(0)
        for (let i = 0; i < 35; i++) {
            if (mem.charAt(i) == '1')
                target |= 1n << BigInt(i)
        }

        arr.set(target, value)
    } else {
        for (let i = startIndex; i < 36; i++) {
            if (mem.charAt(i) == 'X') {
                let newMem = mem.substr(0, i) + '0' + mem.substr(i + 1)
                setValue(newMem, value, i + 1)
                newMem = mem.substr(0, i) + '1' + mem.substr(i + 1)
                setValue(newMem, value, i + 1)
                return
            }
        }

        setValue(mem, value, 36)
    }
}

lines.forEach(l => {
    let target, value
    [target, value] = l.split(' = ')

    if (target == 'mask') {
        mask = value
    } else {
        const index = BigInt(parseInt(target.substr(target.indexOf('[') + 1, target.indexOf(']'))))
        value = parseInt(value)
        let stringIndex = ''

        for (let i = 0; i < 36; i++) {
            if (mask.charAt(i) == '0') {
                stringIndex += ((index >> BigInt(35 - i)) & 1n) ? '1' : '0'
            } else if (mask.charAt(i) == '1') {
                stringIndex += '1'
            } else {
                stringIndex += 'X'
            }

            //console.log(stringIndex)
        }

        setValue(stringIndex, value, 0)
    }
})

let result = BigInt(0)
for (let value of arr.values()) {
    result += BigInt(value)
    //console.log(result)
}

console.log(result)
