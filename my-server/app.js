const express = require('express');
const app = express();
const { v4: uuid } = require('uuid');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((reg, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

let students = [
    { id: '1', name: 'Jeerawuth', email: 'jeerawuth@hotmail.com' },
    { id: '2', name: 'Worawan', email: 'worawan99@hotmail.com' },
    { id: '3', name: 'Sombat', email: 'sombutlovelove@hotmail.com' },
    { id: '4', name: 'Suwichan', email: 'suwichan99@hotmail.com' },
    { id: '5', name: 'Romyen', email: 'romyen@gmail.com' },
    { id: '6', name: 'Natipong', email: 'natiphong@hotmail.com' },
];

app.get('/api/students', function (req, res) {
    if (students.length >= 0) {
        res.status(200).send(students);
    } else {
        res.status(400).send(`Not found any student`);
    }
});

app.get('/api/students/:id', function (req, res) {
    const id = req.params.id;
    const student = students.find(item => item.id === id)
    if (student) {
        res.send(student);
    } else {
        res.status(400).send(`Not found Student for id ${id}`)
    }
});

app.post('/api/students/', function (req, res) {
    const studentName = req.body.name;
    const studentEmail = req.body.email;

    if (studentName.length <= 0) {
        res.status(400).send('Error cannot add student!');
    } else {
        const student = {
            id: uuid(),
            name: studentName,
            email: studentEmail,
        }

        students.push(student);
        res.send(student);
    }
})

app.delete('/api/students/:id', function (req, res) {
    const id = req.params.id;
    const student = students.find(item => item.id === id);
    if(student){
        const index = students.indexOf(student);
        students.splice(index, 1);
        res.send(student)
    } else {
        res.status(400).send(`Error cannot delete student!!`)
    }
});

app.put('/api/students/:id', function (req, res){
    const id = req.params.id;
    const studentName = req.body.name;
    const studentEmail = req.body.email;
    if(studentName < 1){
        res.status(400).send('Error cannot update student')
    } else {
        let student = students.find(item => item.id === id);
        if(student){
            student.name = studentName;
            student.email = studentEmail;
            res.send(student);
        }else{
            res.status(400).send('Cannot find staudent to update')
        }
    }

})

 const port = process.env.port || 3001
 app.listen(port, function(){
    console.log('Litening on port', port);
 })