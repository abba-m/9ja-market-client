import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  //  const { isAuthenticated } = useSelector((state) => ({
  //     isAuthenticated: state.auth.isAuthenticated,
  // }))

  const isAuthenticated = false;
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default ProtectedRoute;
