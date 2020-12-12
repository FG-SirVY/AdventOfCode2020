const fs = require('fs')
const EOL = require('os').EOL

const seatLines = fs.readFileSync('input/day11.txt', 'utf-8').split(EOL)

const SeatState = {
    OCCUPIED: '#',
    EMPTY: 'L',
    FLOOR: '.'
}

let prev_seats = seatLines.map(l => {
    const row = []

    for (let c of l) {
        row.push(c)
    }

    return row
})

function countAllSeats(x, y) {
    let occupiedCount = 0

    if (x > 0) {
        if (y > 0 && prev_seats[y - 1][x - 1] == SeatState.OCCUPIED) {
            occupiedCount++
        }
        if (prev_seats[y][x - 1] == SeatState.OCCUPIED) {
            occupiedCount++
        }
        if (y < prev_seats.length - 1 && prev_seats[y + 1][x - 1] == SeatState.OCCUPIED) {
            occupiedCount++
        }
    }

    if (y > 0 && prev_seats[y - 1][x] == SeatState.OCCUPIED) {
        occupiedCount++
    }

    if (y < prev_seats.length - 1 && prev_seats[y + 1][x] == SeatState.OCCUPIED) {
        occupiedCount++
    }

    if (x < prev_seats.length - 1) {
        if (y > 0 && prev_seats[y - 1][x + 1] == SeatState.OCCUPIED) {
            occupiedCount++
        }
        if (prev_seats[y][x + 1] == SeatState.OCCUPIED) {
            occupiedCount++
        }
        if (y < prev_seats.length - 1 && prev_seats[y + 1][x + 1] == SeatState.OCCUPIED) {
            occupiedCount++
        }
    }

    console.log(`${y}|${x} => ${occupiedCount}`)

    return occupiedCount
}

function printSeats() {
    console.log(prev_seats.length + 'x' + prev_seats[0].length)
    prev_seats.forEach(row => {
        console.log(row.reduce((acc, val) => acc + val, ''))
    })

    console.log('------------------------------------------------')
}

let seats
let repeat = false
do {
    seats = []

    for (let y = 0; y < prev_seats.length; y++) {
        seats.push([])
        for (let x = 0; x < prev_seats[0].length; x++) {
            switch (prev_seats[y][x]) {
                case SeatState.EMPTY:
                    if (countAllSeats(x, y) == 0) {
                        seats[y].push(SeatState.OCCUPIED)
                        //console.log(x + '/' + y + '|' + checkAllSeats(x, y))
                    } else {
                        seats[y].push(SeatState.EMPTY)
                    }
                    break

                case SeatState.OCCUPIED:
                    if (countAllSeats(x, y) >= 4) {
                        seats[y].push(SeatState.EMPTY)
                        //console.log(x + '/' + y + '|' + checkAllSeats(x, y))
                    } else {
                        seats[y].push(SeatState.OCCUPIED)
                    }
                    break

                case SeatState.FLOOR:
                    seats[y].push(SeatState.FLOOR)
                    break
            }
        }
    }

    repeat = false
    for (let y = 0; y < prev_seats.length; y++) {
        for (let x = 0; x < prev_seats[0].length; x++) {
            if (prev_seats[y][x] != seats[y][x]) {
                repeat = true
            }
        }
    }

    prev_seats = seats
    //console.log(changedO + ' ' + changedE)
    printSeats()
} while (repeat)


let totalOccupied = 0

prev_seats.forEach(row => {
    row.forEach(s => {
        if (s == SeatState.OCCUPIED)
            totalOccupied++
    })
})

console.log(totalOccupied)
