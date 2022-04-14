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

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/authenticate/:id&:user_pass', (req, res) => {
    const user = req.params.id;
    const pass = req.params.user_pass;

    console.log(user);
    console.log(pass);

    const sqlSelect = "SELECT User_ID, Privilege FROM bookish_calgarian_db.users WHERE User_ID = ? AND Password = ?;"
    db.query(sqlSelect, [user, pass], (err, result) => {
        if (err)
            console.log(err);
        else
            console.log("Successfully authenticated.");
            console.log(result);
            res.send(result);
    });
});

app.get('/api/getNumBooks', (req, res) => {
    const sqlSelect = "SELECT MAX(book_id) as num_books FROM bookish_calgarian_db.books;"
    db.query(sqlSelect, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
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
    const seller_id = req.body.a_seller_id;

    const sqlInsert = "INSERT INTO bookish_calgarian_db.books VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?);"
    db.query(sqlInsert, [book_id, title, price, isbn, author, quality, pubDate, lang, 
        genre, pageC, wordC, bookstore, shelf, null, seller_id ], (err, result) => {
        if (err)
            console.log(err);
        else
            console.log("Successfully inserted book.");
    });
});

app.get('/api/allBooks', (req, res) => {

    const sqlSelect = "SELECT * FROM bookish_calgarian_db.books WHERE Buyer_ID IS NULL;"
    db.query(sqlSelect, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
            res.send(result);
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

app.put('/api/buyBook', (req, res) => {
    const user = req.body.User
    const book = req.body.book_id
   
    const sqlUpdate = "UPDATE bookish_calgarian_db.books SET Buyer_ID = ? WHERE Book_ID = ?"
    db.query(sqlUpdate, [user, book], (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(`Successfully bought ${book}.`);
    });
});

app.get('/api/searchUsers/:user', (req, res) => {
    const findUsers = req.params.user;

    const sqlSelect = "SELECT * FROM bookish_calgarian_db.users WHERE User_ID = ?;"
    db.query(sqlSelect, findUsers, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
            res.send(result);
    });
});

app.delete('/api/deleteUser/:user&:role', (req, res) => {
    const delete_user = req.params.user;
    const priv = req.params.role;

    const sqlDELETE = "DELETE FROM bookish_calgarian_db.users WHERE User_ID = ?;"
    db.query(sqlDELETE, delete_user, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(`Successfully deleted ${delete_user} from users.`);
    });

    if (priv === 'admin')
    {
        const sqlDELETE = "DELETE FROM bookish_calgarian_db.employees WHERE User_ID = ?;"
        db.query(sqlDELETE, delete_user, (err, result) => {
            if (err)
                console.log(err);
            else
                console.log(`Successfully deleted ${delete_user} from employees.`);
        });
    }
});

app.put('/api/updateUser', (req, res) => {
    const updateUser = req.body.User
    const updateRole = req.body.Role;
    const BDU = req.body.Buyer_discount_usage;
    const SDU = req.body.Seller_discount_usage;
    console.log(`input values: ${updateUser},  ${updateRole}, ${BDU}, and ${SDU}`);

    const sqlUpdate = "UPDATE bookish_calgarian_db.users SET Privilege = ?, Buyer_discount_usage = ? , Seller_discount_usage = ? WHERE User_ID = ?"
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

    const sqlInsert = "INSERT INTO bookish_calgarian_db.users VALUES (?, ?, ?, ?, ?);"
    db.query(sqlInsert, [a_user, a_pass, a_role, BDU, SDU], (err, result) => {
            if (err)
                console.log(err);
            else
                console.log("Successfully added user.");
        });
});

app.post('/api/addEmployee', (req, res) => {
    const a_user = req.body.User
    const a_ssn = req.body.Ssn
    const a_bday = req.body.Bday;
    const a_add = req.body.Add;
    const a_sal = req.body.Sal;

    const sqlInsert = "INSERT INTO bookish_calgarian_db.employees VALUES (?, ?, ?, ?, ?);"
    db.query(sqlInsert, [a_user, a_ssn, a_bday, a_add, a_sal], (err, result) => {
        if (err)
            console.log(err);
        else
            console.log("Successfully added employee.");
    });
});

app.get('/api/allUsers', (req, res) => {

    const sqlSelect = "SELECT * FROM bookish_calgarian_db.users;"
    db.query(sqlSelect, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
            res.send(result);
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
});


app.get('/api/wishlist/:user', (req, res) => {
    const findWishlist = req.params.user;

    const sqlSelect = "SELECT Book_ID FROM bookish_calgarian_db.wishlist WHERE User_ID = ?;"
    db.query(sqlSelect, findWishlist, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
            res.send(result);
    });
});

app.get('/api/wishlistBooks/:user', (req, res) => {
    const findBooks = req.params.user;

    const sqlSelect = "SELECT * FROM bookish_calgarian_db.books as b RIGHT JOIN(SELECT Book_ID FROM bookish_calgarian_db.wishlist WHERE User_ID = ?) AS x ON  b.Book_ID = x.Book_ID"
    db.query(sqlSelect, findBooks, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
            res.send(result);
    });
});

app.post('/api/addWishlist', (req, res) => {
    const user = req.body.User
    const book = req.body.book_id

    const sqlInsert = "INSERT INTO bookish_calgarian_db.wishlist VALUES (?, ?);"
    db.query(sqlInsert, [user, book], (err, result) => {
        if (err)
            console.log(err);
        else
            console.log("Successfully added to wishlist.");
    });
});
app.delete('/api/deleteWishlist/:user&:book', (req, res) => {
    const user = req.params.user;
    const delete_book = req.params.book;

    const sqlDELETE = "DELETE FROM bookish_calgarian_db.wishlist WHERE Book_ID = ? AND User_ID = ?;"
    db.query(sqlDELETE, [delete_book, user], (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(`Successfully deleted Book_ID ${delete_book}.`);
    });
});

app.listen(3001, () => {
    console.log('running on port 3001');
});
