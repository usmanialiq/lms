import { Switch, Route } from "react-router-dom";

import PrivateRoute from "../../utils/PrivateRoute";
import ClientRoute from "../routes/helper";

import Home from "../../components/Home";
import SignIn from "../../components/Auth";
import SignUp from "../../components/Auth/Register";
import AddBook from "../../components/Books/Add";
import Checkout from "../../components/CheckOut";
import CheckIn from "../../components/CheckIn";
import NotFound from "../../components/NotFound";

function Routes() {
    return (
        <Switch>
            <Route exact path={ClientRoute("sign-in")} component={SignIn} />
            <Route exact path={ClientRoute("sign-up")} component={SignUp} />
            <PrivateRoute exact path={ClientRoute("")} component={Home} />
            <PrivateRoute exact path={ClientRoute("add-book")} component={AddBook} />
            <PrivateRoute exact path={ClientRoute("checkout/:id")} component={Checkout} />
            <PrivateRoute exact path={ClientRoute("checkin/:id")} component={CheckIn} />
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    )
}

export default Routes;