import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

//components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";


const client = new ApolloClient({
  // uri: "http://localhost:4000/graphql",
  uri: "https://polar-lake-77790.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
    return(
      <ApolloProvider client={client}>
      <div id="main" className="App">
        <h1>Ninja's Reading list</h1>
        <BookList></BookList>
        <AddBook></AddBook>
      </div>
    </ApolloProvider>
    )
}

export default App;
