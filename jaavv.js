const employees = [
    {id: 101, name: 'John Doe', position: 'Software Engineer', salary: 80000},
    {id: 102, name: 'Jane Smith', position: 'Product Manager', salary: 95000},
    {id: 103, name: 'Alice Johnson', position: 'UX Designer', salary: 70000},
    {id: 104, name: 'Bob Brown', position: 'Data Scientist', salary: 120000}
]
console.log(Math.max(...employees.map(emp => emp.salary)));

console.log(Math.min(...employees.map(emp => emp.salary)));

console.log((employees.map( emp => Math.round(emp.salary))));

const randomEmployee = employees[Math.floor(Math.random() * employees.length)];

console.log(randomEmployee);


employees.reduce((total, emp) => total + emp.salary, 0);

employees.reduce((highest, emp) => emp.salary > highest.salary ? emp : highest, employees[0]);


    
const projected = employees.map(emp => {
    const projectedSalary = emp.salary * 1.05;
    return {
        ...emp,
        salary: projectedSalary
    }
})

const highEarners = employees.filter(emp => emp.salary > 90000);

const names = highEarners.map(emp => emp.name);

console.log(names, highEarners);

const filteredEmployees = employees.filter(emp => emp.salary < 90000);'

const filteredEmployees2 = employees.filter(emp => emp.name.includes('J'));

console.log(filteredEmployees2);


employees.forEach(emp => console.log(emp.name));



console.log(filteredEmployees);

console.log(projected[0].salary)


for (let i = 0; i < highEarners.length; i++) {
    console.log(highEarners[i].name);
}

for (const person of highEarners) {
    console.log(person.name);
}

Math.round(projected[0].salary);
console.log(Math.max(employees[0].salary,employees[1].salary));
window.status = "All systems operational";



let taxi = {
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    color: 'blue',
    mileage: 15000,
    isAvailable: true,
    farePerMile: 2.5,
    driver: {
        name: 'John Doe',
        licenseNumber: 'D1234567',
        rating: 4.8
    },
    startRide: function() {
        console.log('Ride started');
    },
    endRide: function() {
        console.log('Ride ended');
    }
}


console.log(taxi.driver.name);

taxi.driver.name = 'Jane Smith';

console.log(taxi.driver.name);


let coffee = {
    constructor: function(type, ounces) {
        this.type = type;
        this.ounces = ounces;
    }
    toStirng() {
        return `${this.ounces} oz ${this.type}`;
    }
}

function makeCoffee(type, ounces) {
    if (ounces === 8){
        console.log('small coffee');
    } else if(ounces === 12) {
        console.log('medium coffee');
    } else if(ounces === 16) {
        console.log('large coffee');
    } else {
        console.log('invalid size');
    }
}

function makeCoffee(type, ounces) {
    switch(ounces){
        case 8: 
            console.log('small coffee');
            break;
        case 12:
            console.log('medium coffee')
            break;
        case 16:
            console.log('large coffee');
            break;
        default:
            console.log('invalid size');
            
    }
}

makeCoffee('latte', 12);

let coffee = new Coffee('latte', 12);
console.log(coffee.toString());


class Coffee {
    static counter = 0;
    constructor(type, ounces){
        this.type = type;
        this.ounces = ounces;
        this.shopName = 'JavaVv';
        counter++;
    }
}

let coffee1 = new Coffee('latte', 12);

console.log(coffee1.counter++); 


const http = require("http");


http.createServer((request, response)=> {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello World');
    response.end();
}).listen(3000);

console.log('Server running at http://localhost:3000/');
})




arr = [10,20,30]

var filter = function(arr, fn) {
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i])
    }
}

arr = [1,2,3]

const newArray = map(arr, plusOne);

var map = function(arr, fn){
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
        newArr.push(fn(arr[i], i));
    }
    return newArr;
}


const newtab = window.open('https://www.google.com', '_blank');

arr = [1,2,3]

function fn(x, y) {
    return x,y;
}   


var sortBy = function(arr, fn) {
let sortedArr = [...arr];

sortedArr.sort((a, b) => fn(a) - fn(b));
return sortedArr;
}









