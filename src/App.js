import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from './view/home'
import NotFound from './view/404'

function App() {
    return (
        <Router>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/web/nanhai/:id" component={Home} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
}

export default App;
