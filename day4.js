const fs = require('fs')
const EOL = require('os').EOL

const lines = fs.readFileSync('input/day4.txt', 'utf-8').split(EOL)

const target = {
    byr: false,
    iyr: false,
    eyr: false,
    hgt: false,
    hcl: false,
    ecl: false,
    pid: false,
    cid: false
}

let validPasswords = 0

function allEntriesPresent(target) {
    return target.byr
            && target.iyr
            && target.eyr
            && target.hgt
            && target.hcl
            && target.ecl
            && target.pid
            //&& target.cid
}

function resetEntries(target) {
    Object.keys(target).forEach(k => {
        target[k] = false
    })
}

/* Part One
lines.forEach(e => {
    if (e.length === 1) {
        if (allEntriesPresent(target)) {
            validPasswords++
        }

        resetEntries(target)

        return
    }

    for (let i = 0; i < e.length; i++) {
        if (e.charAt(i) === ':') {
            target[e.slice(i - 3, i)] = true
        }
    }
})

if (allEntriesPresent(target)) {
    validPasswords++
}

resetEntries(target)

console.log(validPasswords)*/


// Part Two

function validateField(key, value, target) {
    value = value.trim()

    switch (key) {
        case 'byr':
            target.byr = value >= 1920 && value <= 2002
            break
        
        case 'iyr':
            target.iyr = value >= 2010 && value <= 2020
            break
        
        case 'eyr':
            target.eyr = value >= 2020 && value <= 2030
            break

        case 'hgt':
            const unit = value.slice(-2)
            const number = value.slice(0, -2)

            if (unit === 'cm') {
                target.hgt = number >= 150 && number <= 193
            } else if (unit === 'in') {
                target.hgt = number >= 59 && number <= 76
            } else {
                target.hgt = false
            }

            break
        
        case 'hcl':
            target.hcl = !!value.match(/^\#[a-f0-9]{6}$/)
            break

        case 'ecl':
            target.ecl = value === 'amb'
                || value === 'blu'
                || value === 'brn'
                || value === 'gry'
                || value === 'grn'
                || value === 'hzl'
                || value === 'oth'
            break

        case 'pid':
            target.pid = !!value.match(/^[0-9]{9}$/)
            break
    }
}

lines.forEach(e => {
    if (e.length === 1) {
        if (allEntriesPresent(target)) {
            validPasswords++
        }

        resetEntries(target)

        return
    }

    let semicolonIndex = 0

    for (let i = 0; i < e.length; i++) {
        if (e.charAt(i) === ':') {
            semicolonIndex = i
        } else if (e.charAt(i) === ' ') {
            validateField(e.slice(semicolonIndex - 3, semicolonIndex), e.slice(semicolonIndex + 1, i), target)
        }
    }

    validateField(e.slice(semicolonIndex - 3, semicolonIndex), e.slice(semicolonIndex + 1), target)
})

if (allEntriesPresent(target)) {
    validPasswords++
}

resetEntries(target)

console.log(target)
console.log(validPasswords)
