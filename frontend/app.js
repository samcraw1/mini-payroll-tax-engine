const employeeList = document.getElementById('employees-list');


fetch("http://localhost:3000/api/employees")
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

const form = document.getElementById('calculate-form');
const paystub = document.getElementById('paystub');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const grossPay = document.getElementById('gross-pay').value;
    const state = document.getElementById('state').value;

    fetch('http://localhost:3000/api/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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

    fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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



