const fs = require('fs')
const EOL = require('os').EOL

const Operations = {
    NOP: 'nop',
    ACC: 'acc',
    JMP: 'jmp'
}

const lines = fs.readFileSync('input/day8.txt', 'utf-8').split(EOL)
const instructions = []

lines.forEach(l => {
    const operation = l.split(' ')
    instructions.push({
        opCode: operation[0],
        argument: parseInt(operation[1])
    })
})

/* Part One
let acc = 0

function interpret(index) {
    const instruction = instructions[index]

    if (instruction.visited) {
        console.log(acc)
        process.exit()
    }

    instruction.visited = true

    switch (instruction.opCode) {
        case Operations.ACC:
            acc += instruction.argument
            break

        case Operations.JMP:
            index += instruction.argument - 1
            break

        case Operations.NOP:
        default:
            break
    }

    index++

    return index
}

let index = 0

do {
    index = interpret(index)
} while (true)*/


// Part Two


let acc = 0
let targetIndex = instructions.length
let reversionIndex = -1
let reversionTo

function changeNext() {
    while (true) {
        reversionIndex++
        if (instructions[reversionIndex].opCode === Operations.JMP) {
            instructions[reversionIndex].opCode = Operations.NOP
            reversionTo = Operations.JMP
            return
        } else if (instructions[reversionIndex].opCode === Operations.NOP) {
            instructions[reversionIndex].opCode = Operations.JMP
            reversionTo = Operations.NOP
            return
        }
    }
}

function interpret(index) {
    const instruction = instructions[index]

    if (instruction.visited) {
        acc = 0
        instructions.forEach(i => {
            i.visited = false
        })
        instructions[reversionIndex].opCode = reversionTo

        changeNext()
        console.log(reversionIndex)
        return 0
    }

    instruction.visited = true

    switch (instruction.opCode) {
        case Operations.ACC:
            acc += instruction.argument
            break

        case Operations.JMP:
            index += instruction.argument - 1
            break

        case Operations.NOP:
        default:
            break
    }

    index++

    return index
}

let index = 0
changeNext()
console.log(reversionIndex)

do {
    index = interpret(index)
} while (index !== targetIndex)

console.log(acc)
