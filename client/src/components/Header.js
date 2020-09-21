import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_USER } from "actions/userActions";

function Header() {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return null;
  if (error) throw Error(error.message);

  const renderLoggedIn = (
    <Fragment>
      <a href="#0">
        <img src="#" alt="" />
      </a>
      <Link to="/posts/new">Create Post</Link>
      <a href="/auth/logout">Log Out</a>
    </Fragment>
  );

  const renderLoggedOut = <a href="/auth/github">Sign in with GitHub</a>;

  return <header>{data.user ? renderLoggedIn : renderLoggedOut}</header>;
}

export default Header;
