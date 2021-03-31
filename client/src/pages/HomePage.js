import React from "react";
import { Button, Jumbotron } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const HomePage = () => {
   return (
      <>
         <Jumbotron>
            <h1 className="text-center">Welcome to My Library!</h1>
            <p className="text-center">
               This is a simple Fullstack MERN Application to demonstrate how
               Nginx and Docker can be used in this workflow
            </p>
            <p className="text-center">
               <LinkContainer to="/books">
                  <Button variant="success" size="lg">
                     My Books
                  </Button>
               </LinkContainer>
            </p>
         </Jumbotron>
      </>
   );
};

export default HomePage;
