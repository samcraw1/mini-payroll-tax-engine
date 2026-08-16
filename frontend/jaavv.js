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

console.log(projected[0].salary)


