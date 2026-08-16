const express = require('express');
const cors = require('cors');
const { execFile } = require('child_process');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'payroll'
});



app.get('/api/employees', (request, response) => {
  db.query('select * from employees', (error, results) => {
    if (error) {
        return response.status(500).json({error: error.message});
    }
    response.json(results);
  });
});

app.post('/api/calculate', (request, response) => {
    const { gross_pay } = request.body;

    execFile('python3', ['worker/tax_brackets.py', String(gross_pay)], (error, standoutOutput) => {
        if (error) {
            return response.status(500).json({ error: error.message });
        }
        response.json(JSON.parse(standoutOutput));

    });

});
db.connect(error =>  { 
    if(error) {
        console.log('Error connecting to the database:', error.message);
        return;

    }
    console.log('Connected to the database');
});

app.listen(3000, () => console.log('Server is running on port 3000'));

