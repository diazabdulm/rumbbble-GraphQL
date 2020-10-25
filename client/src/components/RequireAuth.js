import { useQuery } from "@apollo/client";
import { Redirect } from "react-router-dom";

import { GET_USER } from "actions/userActions";

function withRequireAuth(WrappedComponent) {
  const RequireAuth = (props) => {
    const { loading, error, data } = useQuery(GET_USER);

    if (loading) return null;
    if (error) throw Error(error.message);
    if (!data.user) return <Redirect to="/" />;

    return <WrappedComponent {...props} />;
  };

  return RequireAuth;
}

export default withRequireAuth;
