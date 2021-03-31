import React, { useEffect } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listBookDetails } from "../actions/bookActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const BookPage = ({ match }) => {
   const dispatch = useDispatch();

   const bookDetails = useSelector((state) => state.bookDetails);
   const { loading, error, book } = bookDetails;

   useEffect(() => {
      dispatch(listBookDetails(match.params.id));
   }, [dispatch, match]);
   return (
      <>
         <Link className="btn btn-success my-3" to="/books">
            Go Back to My Books
         </Link>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant="danger">{error}</Message>
         ) : (
            <Row>
               <Card className="my-3 p-3 rounded">
                  <Card.Header as="h2">
                     <strong>{book.title}</strong>
                  </Card.Header>
                  <Card.Body>
                     <Card.Subtitle className="mb-2 text-muted">
                        {book.subtitle}
                     </Card.Subtitle>
                     <Card.Text>{book.description}</Card.Text>

                     <Card.Text as="h6">ISBN {book.isbn}</Card.Text>
                     <Button variant="primary">{book.author}</Button>
                  </Card.Body>
               </Card>
            </Row>
         )}
      </>
   );
};

export default BookPage;
