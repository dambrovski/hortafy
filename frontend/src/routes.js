import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import RegisterClient from './pages/RegisterClient';
import RegisterProducer from './pages/RegisterProducer';
import ProfileClient from './pages/ProfileClient';
import ProfileProducer from './pages/ProfileProducer';
import Chart from './pages/Chart';
import Order from './pages/Order';
import Product from './pages/Product';
import NewIncident from './pages/NewIncident';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/registerClient" component={RegisterClient} />
                <Route path="/registerProducer" component={RegisterProducer} />
                <Route path="/profileProducer" component={ProfileProducer} />
                <Route path="/profileClient" component={ProfileClient} />
                <Route path="/products" component={Product} />
                <Route path="/charts" component={Chart} />
                <Route path="/orders" component={Order} />
            
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    )
    
}