const express = require('express');
const cors = require('cors');
const { execFile } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/api/employees', (request, response) => {
    response.json(employees);
});




const employees = [
    {id: 101, name: 'John Doe', position: 'Software Engineer', salary: 80000},
    {id: 102, name: 'Jane Smith', position: 'Product Manager', salary: 95000},
    {id: 103, name: 'Alice Johnson', position: 'UX Designer', salary: 70000},
    {id: 104, name: 'Bob Brown', position: 'Data Scientist', salary: 120000}
];

app.post('/api/calculate', (request, response) => {
    const { gross_pay } = request.body;

    execFile('python3', ['worker/tax_brackets.py', String(gross_pay)], (error, standoutOutput) => {
        if (error) {
            return response.status(500).json({ error: error.message });
        }
        response.json(JSON.parse(standoutOutput));

    });

});

app.listen(3000, () => console.log('Server is running on port 3000'));

