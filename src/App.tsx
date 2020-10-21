import React, { useState } from "react";
import * as Realm from "realm-web";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Kalender from "./Kalender";

const API_KEY =
  "GgyFERs9mnwbtkdxnYQSZ8VIvDWOMtOuHqDJCKaRQ4ok9pB1oQ41AEOS3oKGYkIF";
export const APP_ID = "application-1-qtxeq";
const graphql_url = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;
const credentials = Realm.Credentials.apiKey(API_KEY);
// Connect to your MongoDB Realm app
const app = new Realm.App(APP_ID);

// Get a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  if (!app.currentUser) {
    // If no user is logged in, log in an anonymous user
    await app.logIn(credentials); //Realm.Credentials.anonymous()
  } else {
    // The logged in user's access token might be stale,
    // Refreshing custom data also refreshes the access token
    await app.currentUser.refreshCustomData();
  }
  // Get a valid access token for the current user
  return app.currentUser?.accessToken;
}

const Login = (props: any) => {
  getValidAccessToken().then((value) => props.setToken(value));
  return <h1>Logging in</h1>;
};
function App() {
  const [token, setToken] = useState(null);
  if (token) {
    const httpLink = createHttpLink({
      uri: graphql_url,
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Kalender />
        </div>
      </ApolloProvider>
    );
  } else {
    return <Login setToken={setToken} />;
  }
}

export default App;
