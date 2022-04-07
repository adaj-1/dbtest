const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "test",
    databse: "bookish_calgarian_db"
});

// FETCHING DATA
/*
db.query("SELECT * FROM bookish_calgarian_db.books", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    // rows fetch
    console.log(data);
});

app.get('/', (req ,res) => {
    
    const sqlInsert = "INSERT INTO bookish_calgarian_db.testme VALUES (1, 'jada');"
    db.query(sqlInsert, (err, result) => {
    res.send("hello pedro");
    })
    
});
*/
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/gettestme', (req, res) => {
    const sqlSelect = "SELECT * FROM bookish_calgarian_db.testme;"
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {
    const number = req.body.number_test;
    const Name = req.body.name_test;

    const sqlInsert = "INSERT INTO bookish_calgarian_db.testme VALUES (?, ?);"
    db.query(sqlInsert, [number, Name], (err, result) => {
        if (err)
            console.log(err);
        else
            console.log("Successfully inserted.");
    })
});


app.delete('/api/delete/:delete_number', (req, res) => {
    const number = req.params.delete_number;

    const sqlDELETE = "DELETE FROM bookish_calgarian_db.testme WHERE number = ?;"
    db.query(sqlDELETE, number, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log("Successfully deleted.");
    });
});

app.put('/api/update', (req, res) => {
    const testnum = req.body.number_test;
    const testname = req.body.name_test;
    console.log(`input values: ${testnum} and ${testname}.`);

    const sqlUpdate = "UPDATE bookish_calgarian_db.testme SET name = ? WHERE number = ?"
    db.query(sqlUpdate, [testname, testnum], (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(`Successfully updated ${testnum} to ${testname}.`);
    });
});


app.listen(3001, () => {
    console.log('running on port 3001');
});


