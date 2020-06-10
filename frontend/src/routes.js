import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import RegisterClient from './pages/RegisterClient';
import RegisterProducer from './pages/RegisterProducer';
import Profile from './pages/Profile';
import Chart from './pages/Chart';
import Order from './pages/Order';
import NewIncident from './pages/NewIncident';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/registerClient" component={RegisterClient} />
                <Route path="/registerProducer" component={RegisterProducer} />
                <Route path="/profile" component={Profile} />
                <Route path="/charts" component={Chart} />
                <Route path="/orders" component={Order} />
            
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    )
    
}