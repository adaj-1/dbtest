const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');

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


// START OF REAL CODE

// citation: https://blog.logrocket.com/how-to-secure-react-app-login-authentication/
const auth = basicAuth({
    users: {
        'admin': 'secret',  //admin
        'user': 'pass',    //buyer/seller
    }
});

app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

app.get('/authenticate', auth, (req, res) => {
    const options = {
        httpOnly: true,
        signed: true,
    }
    if (req.auth.user === 'admin') {
        res.cookie('name', 'admin', options).send({ screen: 'admin' });
    } else if (req.auth.user === 'user') {
        res.cookie('name', 'user', options).send({ screen: 'user' });
    };
});

app.get('/read-cookie', (req, res) => {
  if (req.signedCookies.name === 'admin') {
    console.log({ screen: 'admin' });
    res.send({ screen: 'admin' });
  } else if (req.signedCookies.name === 'user') {
    console.log({ screen: 'user' });
    res.send({ screen: 'user' });
  } else {
    console.log({ screen: 'admin' });  
    res.send({ screen: 'auth' });
  }
});

app.get('/clear-cookie', (req, res) => {
  res.clearCookie('name').end();
});

// end citation
app.get('/api/getNumBooks', (req, res) => {
    const sqlSelect = "SELECT COUNT(book_id) as num_books FROM bookish_calgarian_db.books;"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post('/api/insertBook', (req, res) => {
    const book_id = req.body.a_book_id;
    const title = req.body.a_title;
    const price = req.body.a_price;
    const isbn = req.body.a_isbn;
    const author = req.body.a_author;
    const quality = req.body.a_quality;
    const pubDate = req.body.a_pubDate;
    const lang = req.body.a_lang;
    const genre = req.body.a_genre;
    const pageC = req.body.a_pageC;
    const wordC = req.body.a_wordC;
    const bookstore = req.body.a_bookstore;
    const shelf = req.body.a_shelf;
    //TODO const buyer_id
    //TODO const seller_id
    //TODO fix null values
    const sqlInsert = "INSERT INTO bookish_calgarian_db.books VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?);"
    db.query(sqlInsert, [book_id, title, price, isbn, author, quality, pubDate, lang, 
                         genre, pageC, wordC, bookstore, shelf, null, null ], (err, result) => {
        if (err)
            console.log(err);
        else
            console.log("Successfully inserted book.");
    });
});

app.get('/api/searchBooks/:book', (req, res) => {
    const findBook = req.params.book;

    const sqlSelect = "SELECT * FROM bookish_calgarian_db.books WHERE ? IN (Title, ISBN, Author) AND Buyer_ID IS NULL;"
    db.query(sqlSelect, findBook, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
            res.send(result);
    });
});

app.get('/api/searchUsers/:user', (req, res) => {
    const findUsers = req.params.user;

    const sqlSelect = "SELECT * FROM bookish_calgarian_db.users WHERE ? IN (User_ID, Role);"
    db.query(sqlSelect, findUsers, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
            res.send(result);
    });
});

app.delete('/api/deleteUser/:user', (req, res) => {
    const delete_user = req.params.user;

    const sqlDELETE = "DELETE FROM bookish_calgarian_db.users WHERE User_ID = ?;"
    db.query(sqlDELETE, delete_user, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(`Successfully deleted ${delete_user}.`);
    });
});

app.put('/api/updateUser', (req, res) => {
    const updateUser = req.body.User
    const updateRole = req.body.Role;
    const BDU = req.body.Buyer_discount_usage;
    const SDU = req.body.Seller_discount_usage;
    console.log(`input values: ${updateUser},  ${updateRole}, ${BDU}, and ${SDU}`);

    const sqlUpdate = "UPDATE bookish_calgarian_db.users SET Role = ?, Buyer_discount_usage = ? , Seller_discount_usage = ? WHERE User_ID = ?"
    db.query(sqlUpdate, [updateRole, BDU, SDU, updateUser], (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(`Successfully updated ${updateUser}.`);
    });
});

app.get('/api/getNumUsers', (req, res) => {
    const sqlSelect = "SELECT COUNT(User_ID) as userIDs FROM bookish_calgarian_db.users;"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post('/api/addUser', (req, res) => {
    const a_user = req.body.User
    const a_pass = req.body.Password
    const a_role = req.body.Role;
    const BDU = req.body.Buyer_discount_usage;
    const SDU = req.body.Seller_discount_usage;
    const a_wishlist = req.body.WishlistID;

    const sqlInsert = "INSERT INTO bookish_calgarian_db.users VALUES (?, ?, ?, ?, ?, ?);"
    db.query(sqlInsert, [a_user, a_pass, a_role, BDU, SDU, a_wishlist], (err, result) => {
            if (err)
                console.log(err);
            else
                console.log("Successfully added user.");
        });
});

app.get('/api/searchPurchase/:buyer', (req, res) => {
    const findBook = req.params.buyer;

    const sqlSelect = "SELECT * FROM bookish_calgarian_db.books WHERE Buyer_ID = ?;"
    db.query(sqlSelect, findBook, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
            res.send(result);
    });
});

app.get('/api/searchSold/:seller', (req, res) => {
    const findBook = req.params.seller;

    const sqlSelect = "SELECT * FROM bookish_calgarian_db.books WHERE Seller_ID = ? AND Buyer_ID IS NOT NULL;"
    db.query(sqlSelect, findBook, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
        res.send(result);
    });
});

app.get('/api/searchSale/:seller', (req, res) => {
    const findBook = req.params.seller;

    const sqlSelect = "SELECT * FROM bookish_calgarian_db.books WHERE Seller_ID = ? AND Buyer_ID IS NULL;"
    db.query(sqlSelect, findBook, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
        res.send(result);
    });
});

app.delete('/api/deleteBook/:book', (req, res) => {
    const delete_book = req.params.book;

    const sqlDELETE = "DELETE FROM bookish_calgarian_db.books WHERE Book_ID = ?;"
    db.query(sqlDELETE, delete_book, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(`Successfully deleted Book_ID ${delete_book}.`);
    });
});

app.put('/api/updateBook', (req, res) => {
    const book_id = req.body.a_book_id;
    const title = req.body.a_title;
    const price = req.body.a_price;
    const isbn = req.body.a_isbn;
    const author = req.body.a_author;
    const quality = req.body.a_quality;
    const pubDate = req.body.a_pubDate;
    const lang = req.body.a_lang;
    const genre = req.body.a_genre;
    const pageC = req.body.a_pageC;
    const wordC = req.body.a_wordC;
    const bookstore = req.body.a_bookstore;
    const shelf = req.body.a_shelf;

    const sqlUpdate = "UPDATE bookish_calgarian_db.books SET Title = ?, Price = ?, ISBN = ?, Author = ?, Quality = ?, Publication_date = ?, Written_language = ?, Genre = ?, Page_count = ?, Word_count = ?, Bookstore = ?, Shelf = ? WHERE Book_ID = ?"
    db.query(sqlUpdate, [title, price, isbn, author, quality, pubDate, lang,
                         genre, pageC, wordC, bookstore, shelf, book_id], (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(`Successfully updated ${book_id}.`);
    });

    /*
   

    const sqlInsert = "INSERT INTO bookish_calgarian_db.books VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?);"
    db.query(sqlInsert, [book_id, title, price, isbn, author, quality, pubDate, lang, 
                         genre, pageC, wordC, bookstore, shelf, null, null ], (err, result) => {
        if (err)
            console.log(err);
        else
            console.log("Successfully inserted book.");
    });
    */
});


app.get('/api/wishlist/:user', (req, res) => {
    const findWishlist = req.params.user;

    const sqlSelect = "SELECT Book_ID FROM bookish_calgarian_db.wishlist WHERE Wishlist_ID = ?;"
    db.query(sqlSelect, findWishlist, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
            res.send(result);
    });
});

app.get('/api/wishlistBooks', (req, res) => {
    const findBooks = req.body.IDs;

    const sqlSelect = "SELECT * FROM bookish_calgarian_db.books WHERE Book_ID IN (?);"
    db.query(sqlSelect, findBooks, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
            res.send(result);
    });
});

app.listen(3001, () => {
    console.log('running on port 3001');
});
