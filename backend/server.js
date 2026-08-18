const express = require('express');
const cors = require('cors');
const { execFile } = require('child_process');
const mysql = require('mysql2');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

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

const bedrock = new BedrockRuntimeClient({ region: 'us-east-1' });

app.post('/api/chat', async (request, response) => {
    try {
        const { message } = request.body;

        const command = new InvokeModelCommand({
            modelId: 'anthropic.claude-3-haiku-20240307-v1:0',
            contentType: 'application/json',
            body: JSON.stringify({
                anthropic_version: 'bedrock-2023-05-31',
                max_tokens: 1024,
                messages: [{ role: 'user', content: message }]
            })
        });

        const bedrockResponse = await bedrock.send(command);
        const result = JSON.parse(new TextDecoder().decode(bedrockResponse.body));

        response.json({ reply: result.content[0].text });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

app.post('/api/employees', (request, response) => {
    const {name,salary,position,state} = request.body;

    db.query('insert into employees (name,salary,position,state) values (?,?,?,?)', [name,salary,position,state], (error, results) => {
        if(error){
            return response.status(500).json({error: error.message});
        } else {
            response.status(201).json({message: 'Employee added successfully', employeeId: results.insertId});
        }
    });
});

class Employee {
    constructor(name,position,salary,state){
        this.name = name;
        this.position = position;
        this.salary = salary;
        this.state = state;
    }


    calculateTax() {
        return new Promise ((resolve,reject) => {
            execFile('python3', ['worker/calculate_tax.py', String(this.salary), String(this.state)], (error, output) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(output));
                }
            });
        });
    }

}

app.put('/api/employees/:id', (request, response) => {
    const employeeId = request.params.id;

    db.query('select * from employees where id = ?', [employeeId], (error, results) => {
        if (error) {
            return response.status(500).json({ error: error.message });
        } else {
            response.status(201).json({ message: 'employee updated' });
        }
    });
});





