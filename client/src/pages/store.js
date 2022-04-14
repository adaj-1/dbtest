import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from "react";
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Layout from "../components/layout";
import Axios from 'axios';

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";


function StorePage() {
    const testUser = localStorage.getItem('User');

    const [userList, setUserList] = useState('');
    const [sellList, setSellList] = useState([]);
    const [saleList, setSaleList] = useState([]);
    const [fic_nonfic, setFic] = useState('');

    const [new_book_id, setNewBookID] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [isbn, setISBN] = useState('');
    const [author, setAuthor] = useState('');
    const [quality, setQuality] = useState('');
    const [pubDate, setPubDate] = useState('');
    const [lang, setLang] = useState('');
    const [genre, setGenre] = useState('');
    const [pageC, setPageC] = useState('');
    const [wordC, setWordC] = useState(null);
    const [bookstore, setBookstore] = useState('');
    const [shelf, setShelf] = useState('');
    const [seller_id, setSellerID] = useState('');

    const sellBook = () => {

        Axios.get('http://localhost:3001/api/getNumBooks').then((response) => {
            setNewBookID(response.data[0].num_books + 1);
        })
        console.log(new_book_id);

        Axios.post('http://localhost:3001/api/insertBook', {
            a_book_id: new_book_id,
            a_title: title,
            a_price: price,
            a_isbn: isbn,
            a_author: author,
            a_quality: quality,
            a_pubDate: pubDate,
            a_lang: lang,
            a_genre: genre,
            a_pageC: pageC,
            a_wordC: wordC,
            a_bookstore: bookstore,
            a_shelf: shelf,
            a_seller_id: seller_id
        })
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/api/getNumBooks').then((response) => {
            setNewBookID(response.data[0].num_books + 1);
        })
        console.log(new_book_id);

        Axios.get(`http://localhost:3001/api/searchUsers/${testUser}`).then((response) => {
            setUserList(response.data);
            setSellerID(response.data[0].User_ID);
        });

        Axios.get(`http://localhost:3001/api/searchSold/${testUser}`).then((response) => {
            setSellList(response.data);
        });

        Axios.get(`http://localhost:3001/api/searchSale/${testUser}`).then((response) => {
            setSaleList(response.data);
        });
    }, []);

    const deleteBook = (book_id) => {
        Axios.delete(`http://localhost:3001/api/deleteBook/${book_id}`);
    };


    const updateBook = (updatebook) => {
        Axios.put("http://localhost:3001/api/updateBook", {
            a_book_id: updatebook,
            a_title: title,
            a_price: price,
            a_isbn: isbn,
            a_author: author,
            a_quality: quality,
            a_pubDate: pubDate,
            a_lang: lang,
            a_genre: genre,
            a_pageC: pageC,
            a_wordC: wordC,
            a_bookstore: bookstore,
            a_shelf: shelf,
        });
    };
    
    return (
        <Layout pageTitle="My Store">
            <h3>My Books On Sale</h3>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Book ID</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Author</th>
                        <th scope="col">Quality</th>
                        <th scope="col">Publication</th>
                        <th scope="col">Language</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Bookstore</th>
                        <th scope="col">Shelf</th>
                        <th scope="col">Manage</th>
                    </tr>
                    {saleList.map((val, index) => {
                        return <tr>
                            <td>{index + 1}</td>
                            <td>{val.Title}</td>
                            <td>{val.Price}</td>
                            <td>{val.Book_ID}</td>
                            <td>{val.ISBN}</td>
                            <td>{val.Author}</td>
                            <td>{val.Quality}</td>
                            <td>{val.Publication_date}</td>
                            <td>{val.Written_language}</td>
                            <td>{val.Genre}</td>
                            <td>{val.Bookstore}</td>
                            <td>{val.Shelf}</td>
                            <td>
                                <button type='button' className="btn btn-success btn-sm" onClick={() => { updateBook(val.Book_ID); window.location.reload(); }}>Update</button>
                                <button type='button' className="btn btn-danger btn-sm mx-1" onClick={() => { deleteBook(val.Book_ID); window.location.reload(); }}>Delete</button>
                            </td>
                        </tr>
                    })}
                </thead>
            </table>

            <br></br>

            <h3>Sell/Update Book</h3>
            <Form>
                <Row>
                    <Col>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Book Title" onChange={(e) => { setTitle(e.target.value) }} />
                    </Col>
                    <Col>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="($) CAD" onChange={(e) => { setPrice(e.target.value) }} />
                    </Col>
                    <Col>
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="number" placeholder="ISBN" onChange={(e) => { setISBN(e.target.value) }} />
                    </Col>
                    <Col>
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="Author" onChange={(e) => { setAuthor(e.target.value) }} />
                    </Col>
                </Row>

                <br></br>

                <Row>
                    <Col>
                        <Form.Label>Publication Date</Form.Label>
                        <Form.Control type="date" onChange={(e) => { setPubDate(e.target.value) }} />
                    </Col>
                    <Col>
                        <Form.Label>Page Count</Form.Label>
                        <Form.Control type="number" placeholder="Page Count" onChange={(e) => { setPageC(e.target.value) }} />
                    </Col>
                    <Col>
                        <Form.Label>Word Count</Form.Label>
                        <Form.Control type="number" placeholder="Optional" onChange={(e) => { setWordC(e.target.value) }} />
                    </Col>
                </Row>

                <br></br>

                <Row>
                    <Col>
                        <Form.Label>Fiction/Non-Fiction</Form.Label>
                        <Form.Select aria-label="Genre" onChange={(e) => { setFic(e.target.value) }} >
                            <option selected>Select Option</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Fiction Category</Form.Label>
                        <Form.Select aria-label="Fiction" disabled={fic_nonfic === 'Non-Fiction' || fic_nonfic === ''} onChange={(e) => { setGenre(e.target.value) }}>
                            <option selected>Select Option</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Science Fiction">Science Fiction</option>
                            <option value="Dystopian">Dystopian</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Romance">Romance</option>
                            <option value="Detetive & Mystery">Detective & Mystery</option>
                            <option value="Horror">Horror</option>
                            <option value="Thriller">Thriller</option>
                            <option vlaue="LGBTQ+">LGBTQ+</option>
                            <option value="Historical Fiction">Historical Fiction</option>
                            <option value="Young Adult (YA)">Young Adult (YA)</option>
                            <option value="Children's Fiction">Children's Fiction</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Non-Fiction Category</Form.Label>
                        <Form.Select aria-label="Non-Fiction" disabled={fic_nonfic === 'Fiction' || fic_nonfic === ''} onChange={(e) => { setGenre(e.target.value) }}>
                            <option selected>Select Option</option>
                            <option value="Memoir & Autobiography">Memoir & Autobiography</option>
                            <option value="Biography">Biography</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Art & Photography">Art & Photography</option>
                            <option value="Self-Help/Personal Development">Self-Help/Personal Development</option>
                            <option value="Motivational/Inspirational">Motivational/Inspirational</option>
                            <option value="Health & Fitness">Health & Fitness</option>
                            <option value="History">History</option>
                            <option value="Crafts, Hobbies & Home">Crafts, Hobbies & Home</option>
                            <option value="Families & Relationships">Families & Relationships</option>
                            <option value="Humor & Entertainment">Humor & Entertainment</option>
                            <option value="Business & Money">Business & Money</option>
                            <option value="Law & Criminology">Law & Criminology</option>
                            <option value="Politics & Social Sciences">Politics & Social Sciences</option>
                            <option value="Religion & Spirituality">Religion & Spirituality</option>
                            <option value="Education & Teaching">Education & Teaching</option>
                            <option value="Travel">Travel</option>
                            <option value="True Crime">True Crime</option>
                        </Form.Select>
                    </Col>
                </Row>

                <br></br>

                <Row>
                    <Col>
                        <Form.Label>Quality</Form.Label>
                        <Form.Select onChange={(e) => { setQuality(e.target.value) }} >
                            <option value="Select Option">Select Option</option>
                            <option value="New Condition">New Condition</option>
                            <option value="Used Condition">Used Condition</option>
                            <option value="Bad Condition">Bad Condition</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Language</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => { setLang(e.target.value) }} >
                            <option value="Select Option">Select Option</option>
                            <option value="English">English</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Arabic">Arabic</option>
                            <option value="Portugese">Portugese</option>
                            <option value="Bengali">Bengali</option>
                            <option value="Russian">Russian</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Bookstore</Form.Label>
                        <Form.Control type="text" placeholder="Bookstore" onChange={(e) => { setBookstore(e.target.value) }} />
                    </Col>
                    <Col>
                        <Form.Label>Shelf</Form.Label>
                        <Form.Control type="text" placeholder="Shelf" onChange={(e) => { setShelf(e.target.value) }} />
                    </Col>
                </Row>

                <br></br>

                <button type='button' className="btn btn-success btn-sm" onClick={() => { sellBook(); window.location.reload(); }}>Sell Book</button>

                <br></br>

            </Form>

            <h3>My Sale History</h3>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Book ID</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Author</th>
                        <th scope="col">Quality</th>
                        <th scope="col">Publication</th>
                        <th scope="col">Language</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Bookstore</th>
                        <th scope="col">Shelf</th>
                    </tr>
                    {sellList.map((val, index) => {
                        return <tr>
                            <td>{index + 1}</td>
                            <td>{val.Title}</td>
                            <td>{val.Price}</td>
                            <td>{val.Book_ID}</td>
                            <td>{val.ISBN}</td>
                            <td>{val.Author}</td>
                            <td>{val.Quality}</td>
                            <td>{val.Publication_date}</td>
                            <td>{val.Written_language}</td>
                            <td>{val.Genre}</td>
                            <td>{val.Bookstore}</td>
                            <td>{val.Shelf}</td>
                        </tr>
                    })}
                </thead>
            </table>

        </Layout>
    )
}

export default StorePage