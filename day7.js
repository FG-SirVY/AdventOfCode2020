const fs = require('fs')
const EOL = require('os').EOL

const rules = fs.readFileSync('input/day7.txt', 'utf-8').split(EOL)

const bagsMap = {}

function addSmallerBag(bagsMap, biggerBag, str, index) {
    const smallerBagCount = str.slice(index, index + 1)
    if (smallerBagCount === 'n')
        return -1
    index += 2
    const bagLabelIndex = str.indexOf(' bag', index)
    const smallerBagName = str.slice(index, bagLabelIndex).replace(' ', '')

    if (!bagsMap[smallerBagName]) {
        bagsMap[smallerBagName] = {
            name: smallerBagName,
            biggerBags: [],
            smallerBags: []
        }
    }

    bagsMap[smallerBagName].biggerBags.push(biggerBag)

    biggerBag.smallerBags.push({
        count: smallerBagCount,
        bag: bagsMap[smallerBagName]
    })

    index = str.indexOf(',', bagLabelIndex) + 2

    return index
}

rules.forEach(r => {
    let index = r.indexOf(' bags contain')
    const targetBagName = r.slice(0, index).replace(' ', '')
    index += 14

    if (!bagsMap[targetBagName]) {
        bagsMap[targetBagName] = {
            name: targetBagName,
            biggerBags: [],
            smallerBags: []
        }
    }

    do {
        index = addSmallerBag(bagsMap, bagsMap[targetBagName], r, index)
    } while (index > 1)
});

/* Part One
function traverseUp(bag, count) {
    if (!bag.visited) {
        bag.visited = true
        count++

        if (bag.biggerBags) {
            bag.biggerBags.forEach(b => {
                count = traverseUp(b, count)
            })
        }
    }
    return count
}

count = console.log(traverseUp(bagsMap['shinygold'], -1))*/


// Part Two

function traverseDown(bag) {
    let count = 1

    for (let i = 0; i < bag.smallerBags.length; i++) {
        count += bag.smallerBags[i].count * traverseDown(bag.smallerBags[i].bag)
    }

    return count
}

console.log(traverseDown(bagsMap['shinygold']) - 1)
