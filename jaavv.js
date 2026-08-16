const employees = [
    {id: 101, name: 'John Doe', position: 'Software Engineer', salary: 80000},
    {id: 102, name: 'Jane Smith', position: 'Product Manager', salary: 95000},
    {id: 103, name: 'Alice Johnson', position: 'UX Designer', salary: 70000},
    {id: 104, name: 'Bob Brown', position: 'Data Scientist', salary: 120000}
]


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


let animal = {
    constructor:function(species) {
        this.species = species;
    }
}


const animalList = [
    new animal.constructor('Dog'),
    new animal.constructor('Cat'),
    new animal.constructor('Bird')
]


animalList[0].roof = function() {
    console.log('This animal has a roof');
}

animalList[1].meow = function(){
    console.log('Meow');
}















for (let i = 0; i < animalList.length; i++) {
    console.log(animalList[i]);
}

for (const animalName of animalList) {
    console.log(animalName);
}

