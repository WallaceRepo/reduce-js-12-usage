/// https://www.youtube.com/watch?v=NiLUGy1Mh4U&ab_channel=LeighHalliday

// How to use .reduce((acc, val) => {}, {} or [], or null or 0 or empty / if empty then callback takes the first arr member as initial val)
const people = [
    { id: "1", name: "Ponyo", age:5 },
    { id: "2", name: "Jenny", age:30},
    { id: "3", name: "Flower", age:9 },
    { id: "4", name: "Bird", age:34}
    ]
let result
result = people.reduce((acc, person) => acc + 1, 0)
console.log(result)
// find sum of age
result = people.reduce((acc, person) => acc + person.age, 0)
console.log(result)
// return all people's names
result = people.reduce((acc, person) => [...acc, person.name], [])

result = people.reduce((acc, person) => {
    return {...acc, [person.id]:person }
}, {})
console.log(result)
console.log(result['4'])
 /// to find max value
result = people.reduce((acc, person)=> {
    if(acc === null || person.age > acc) return person.age;
    return acc
}, null)

console.log(result)

/// to find min value

result = people.reduce((acc, person)=> {
    if(acc ===null || person.age < acc) return person.age
    return acc
}, null)

console.log(result)

//// to find person by their name, in this case find() is easire.

result = people.reduce((acc, person) => {
    if (acc !== null) return acc;
    if(person.name === 'Flower') return person;
    return null
}, null)

console.log(result)

///find all people that over 30
result = people.reduce((acc, person) => {
      if(person.age < 7) return acc + 1
    return acc
}, 0)
console.log(result)

/// return true if people obj have all person over age 20.
result = people.reduce((acc, person) => {
    if(!acc) return false;
    return person.age > 20
}, true)
console.log(result)
/// return true if people obj have any person over age 20.

result = people.reduce((acc, person) => {
    if(!acc) return true;
    return person.age > 18;
}, false)
console.log(result)

const orders = [
    { id: '1', status: 'pending'},
    { id: '2', status: 'pending'},
    { id: '3', status: 'cancelled'},
    { id: '4', status: 'shipped'},
    ]

// Count occurances of all status, return in obj
result = orders.reduce((acc, order) => {
     return {...acc, [order.status]: (acc[order.status] || 0) + 1 }
}, {})
console.log(result)
/// Flatten the array using reduce
const folders = [
    "index.js",
    ["flatten.js", "map.js"],
    ["any.js", ["all.js", "count.js"]]
    ];
    
function flatten(acc, item) {
    if(Array.isArray(item)) {
        return [...acc, ...item.reduce(flatten, [])]
    }
    return [...acc, item]
}

result = folders.reduce(flatten, [])

console.log(result)

//// If we return just reduce fucntion with acc
function flatten1(acc, item) {
    if(Array.isArray(item)) {
        return item.reduce(flatten, acc) // Here we changed the previous func
    }
    return [...acc, item]
}

result = folders.reduce(flatten1, [])

console.log(result)


/// Creating reduce ourselves
function reduce(array, callback, initial) {
    let acc = initial;
    for ( let i = 0; i < array.length; i++){
        acc = callback(acc, array[i], i, array)
    }
    return acc
}
result = reduce([1,2,3], (acc, num) => acc + num, 0);

console.log(result)

// reduce with short circuit

function reduceAbort(array, callback, initial) {
    let acc = initial;
    try {
        for ( let i = 0; i < array.length; i++) {
            acc = callback(acc, array[i], i, array)
        }
    } catch (error) {
        if(Array.isArray(error) && error[0] === 'abort') {
            return error[1]
        }
    } throw error;
    return acc;
}

person = reduceAbort(people, (_acc, person) => {
        if(person.name === "Flower") throw ["abort", person];
        return null;
    }, null )
    
console.log(person)