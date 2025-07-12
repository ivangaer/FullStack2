const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const tasksFile = './tasks.json';

app.get('/tasks', (req, res) => {
    fs.readFile(tasksFile, (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post('/tasks', (req, res) => {
    const { task } = req.body;
    fs.readFile(tasksFile, (err, data) => {
        if (err) throw err;
        const tasks = JSON.parse(data);
        tasks.push(task);
        fs.writeFile(tasksFile, JSON.stringify(tasks), err => {
            if (err) throw err;
            res.status(201).send();
        });
    });
});

app.delete('/tasks/:index', (req, res) => {
    const index = req.params.index;
    fs.readFile(tasksFile, (err, data) => {
        if (err) throw err;
        const tasks = JSON.parse(data);
        tasks.splice(index, 1);
        fs.writeFile(tasksFile, JSON.stringify(tasks), err => {
            if (err) throw err;
            res.status(204).send();
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
