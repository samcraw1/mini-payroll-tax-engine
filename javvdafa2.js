app.get('/api/employees/:id',(request, response) => {
    db.query('select * from employees where id = ?', [request.params.id], (error,results) => {
        if(error) {
            return response.status(500).json({error: error.message});

        }
        response.json(results);

    });
});


app.get('/api/employees/:state',(request, response) => {
    const state = request.params.state;

    if(state) {
        db.query('select * from employees where state = ?', [state], (error, results) => {
            if(error) {
                return response.status(500).json({error: error.message});
            }
            response.json(results);
        });
    }else {
        response.status(400).json({error: 'State parameter is required'});
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

const names = [1, 3, 5, 7, 9];

names.reduce((total,num) => total + num, 0)