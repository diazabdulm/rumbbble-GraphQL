import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";

import { GET_USER } from "actions/userActions";

function Header() {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return null;
  if (error) throw Error(error.message);

  const { user } = data;

  const renderLoggedIn = (
    <Fragment>
      <a href="#0">
        <img src="#" alt="" />
      </a>
      <a href="#0">Upload</a>
    </Fragment>
  );

  const renderLoggedOut = <a href="/auth/github">Sign in with GitHub</a>;

  return <header>{user ? renderLoggedIn : renderLoggedOut}</header>;
}

export default Header;
