import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "components/Header";

import PostList from "components/PostList";
import PostDetail from "components/PostDetail";
import PostCreate from "components/PostCreate";

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route exact path="/posts/new" component={PostCreate} />
        <Route exact path="/posts/:id" component={PostDetail} />
      </Switch>
    </Fragment>
  );
}

export default App;
