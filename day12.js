const fs = require('fs')
const EOL = require('os').EOL

const input = fs.readFileSync('input/day12.txt', 'utf-8').split(EOL)

/* Part One
let posX = 0
let posY = 0

let direction = 0

input.forEach(i => {
    const instruction = i.charAt(0)
    const param = parseInt(i.substr(1))

    //console.log(`${instruction}:${param}`)

    switch (instruction) {
        case 'N':
            posY += param
            break
        
        case 'S':
            posY -= param
            break

        case 'E':
            posX += param
            break

        case 'W':
            posX -= param
            break

        case 'L':
            direction = (360 + direction - param) % 360
            break
        
        case 'R':
            direction = (direction + param) % 360
            break

        case 'F':
            switch (direction) {
                case 0:
                    posX += param
                    break
                
                case 90:
                    posY -= param
                    break

                case 180:
                    posX -= param
                    break

                case 270:
                    posY += param
                    break
            }
            break
    }
})*/

// Part Two

let posX = 0
let posY = 0

let waypointX = 10
let waypointY = 1
let newWaypointX

input.forEach(i => {
    const instruction = i.charAt(0)
    const param = parseInt(i.substr(1))

    //console.log(`${instruction}:${param}`)

    switch (instruction) {
        case 'N':
            waypointY += param
            break
        
        case 'S':
            waypointY -= param
            break

        case 'E':
            waypointX += param
            break

        case 'W':
            waypointX -= param
            break

        case 'L':
            switch (param) {
                case 90:
                    newWaypointX = -waypointY
                    waypointY = waypointX
                    waypointX = newWaypointX
                    break
                
                case 180:
                    waypointX = -waypointX
                    waypointY = -waypointY
                    break
                
                case 270:
                    newWaypointX = waypointY
                    waypointY = -waypointX
                    waypointX = newWaypointX
                    break
            }
            break
        
        case 'R':
            switch (param) {
                case 90:
                    newWaypointX = waypointY
                    waypointY = -waypointX
                    waypointX = newWaypointX
                    break
                
                case 180:
                    waypointX = -waypointX
                    waypointY = -waypointY
                    break
                
                case 270:
                    newWaypointX = -waypointY
                    waypointY = waypointX
                    waypointX = newWaypointX
                    break
            }
            break

        case 'F':
            posX += param * waypointX
            posY += param * waypointY
            break
    }
})


console.log(Math.abs(posY) + Math.abs(posX))
