const employeeList = document.getElementById('employees-list');

document.getElementById('status').textContent = "Welcome to the Employee Management System";

console.log("Employee Management System Loaded");

const API_URL = "http://localhost:3000/api";

const headers = { 
    'Content-Type': 'application/json'
}


function loadEmployees() {
    employeeList.innerHTML = ''; // Clear the existing employee list before loading new data
fetch(`${API_URL}/employees`)
    .then(response => response.json())
    .then(data => {
        const table = document.createElement('table');
        data.forEach(employee => {

            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = employee.name;

            const positionCell = document.createElement('td');
            positionCell.textContent = employee.position;

            const salaryCell = document.createElement('td');
            salaryCell.textContent = employee.salary;


            row.appendChild(nameCell);
            row.appendChild(positionCell);
            row.appendChild(salaryCell);

            table.appendChild(row);
        });
        employeeList.appendChild(table);
    });
}
loadEmployees(); // Initial load of employees when the page loads


const form = document.getElementById('calculate-form');
const paystub = document.getElementById('paystub');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const grossPay = document.getElementById('gross-pay').value;
    const state = document.getElementById('state').value;

    fetch(`${API_URL}/calculate`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ gross_pay: grossPay })
    })
        .then(response => response.json())
        .then(data => {
            paystub.innerHTML = `
                <h3>Paystub</h3>
                <p>Gross Pay: $${grossPay}</p>
                <p>Tax Bracket Limit: $${data.bracket_limit}</p>
                <p>Tax Rate: ${data.rate * 100}%</p>
                <p>Tax Owed: $${(grossPay * data.rate).toFixed(2)}</p>
                <p>Net Pay: $${(grossPay - grossPay * data.rate).toFixed(2)}</p>
            `;
        })

        .catch(error => {
            console.error('Error:', error);
            paystub.innerHTML = `<p>Error calculating paystub. Please try again.</p>`;
        });
});

const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value;
    chatMessages.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    chatInput.value = '';

    fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ message: message })
    })
        .then(response => response.json())
        .then(data => {
            chatMessages.innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;
        })
        .catch(error => {
            console.error('Error:', error);
            chatMessages.innerHTML += `<p><strong>Bot:</strong> Error getting response.</p>`;
        });
});

const addEmployeeForm = document.getElementById('add-employee-form');
addEmployeeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('employee-name').value;
    const salary = document.getElementById('employee-salary').value;
    const state = document.getElementById('employee-state').value;
    const position = document.getElementById('employee-position').value;
    fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ name, salary, position, state })
    })
            
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            addEmployeeForm.reset();
            loadEmployees(); // Refresh the employee list after adding a new employee
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding employee. please try again.');
        });
});

const calculateEmployeeTaxesForm = document.getElementById('calculate-employee-taxes-form');
const taxResults = document.getElementById('tax-results');


calculateEmployeeTaxesForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const employeeId = document.getElementById('employee-id').value;

    fetch(`${API_URL}/employees/${employeeId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(data => {
            taxResults.innerHTML = `<p>${data.message}</p>`;
            console.log(data);
            if (data.taxes) {
                taxResults.innerHTML += `<p>Taxes: ${data.taxes}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            taxResults.innerHTML = `<p>Error calculating taxes. Please try again.</p>`;
        });
});

const updateEmployeeSalaryForm = document.getElementById('update-employee-salary-form');
updateEmployeeSalaryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const employeeId = document.getElementById('update-employee-id').value;
    const newSalary = document.getElementById('update-employee-salary').value;

    fetch(`${API_URL}/employees/${employeeId}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ salary: newSalary})
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            updateEmployeeSalaryForm.reset();
            loadEmployees(); // Refresh the employee list after updating salary
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error updating employee salary. Please try again.');
        });
});

const deleteEmployeeForm = document.getElementById('delete-employee-form');
deleteEmployeeForm.addEventListener('submit', (event) => {
    event.preventDefault();


    const employeeId = document.getElementById('delete-employee-id').value;

    fetch(`${API_URL}/employees/${employeeId}`, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify({})

})
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            deleteEmployeeForm.reset();
            loadEmployees(); // Refresh the employee list after deleting an employee
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error deleting employee. Please try again.');
        });
});





        








