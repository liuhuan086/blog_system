import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./Login";

function Main() {
    return (
        <Router>
            {/*exact 精确匹配路由*/}
            <Route path='/login/' exact component={Login}>

            </Route>
        </Router>
    )
}

export default Main