const connection = require('./connect');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile('index.html');
})
app.get('/notes', (req, res)=>{
    if(!connection){
        res.json('data base error');
    }
    let querry = `select * from notes`;
    connection.query(querry, (error, results)=>{
        if(error){
            console.log('error in getting notes');
            res.json('database error');
        }
        res.json(results);
    });
});

app.post('/notes', (req, res)=>{
   const {title, text, date} = req.body;
   const query = `insert into notes (title, text, date) values (?, ?, ?)`;
   connection.query(query, [title, text, date], (error, results)=>{
    if(error){
        console.log('error in adding note')
        res.json('database error');
    }
    console.log('note added', results);
    res.json({message:'note added successfully', id: results.insertId})
   });
})

app.delete('/notes/:id', (req, res)=>{
    const noteId = req.params.id;
    const query = `delete from notes where id= ?`;
    connection.query(query,[noteId], (error, results)=>{
        if(error){
            console.log('error in deleting note', error);
            res.json('database error');
        }else{
            res.json({message:'note deleted successfull', result:""})
        }
    });
} )

const port = 3000;
app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
})