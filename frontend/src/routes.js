import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import RegisterClient from './pages/RegisterClient';
import RegisterProducer from './pages/RegisterProducer';
import RegisterInstitution from './pages/RegisterInstitution';
import ProfileClient from './pages/ProfileClient';
import ProfileProducer from './pages/ProfileProducer';
import ProfileInstitution from './pages/ProfileInstitution';
import Chart from './pages/Chart';
import OrderClient from './pages/OrderClient';
import OrderProducer from './pages/OrderProducer';
import Product from './pages/Product';
import Kit from './pages/Kit';


export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/registerClient" component={RegisterClient} />
                <Route path="/registerProducer" component={RegisterProducer} />
                <Route path="/registerInstitution" component={RegisterInstitution} />
                <Route path="/profileProducer" component={ProfileProducer} />
                <Route path="/profileClient" component={ProfileClient} />
                <Route path="/profileInstitution" component={ProfileInstitution} />
                <Route path="/products" component={Product} />
                <Route path="/kits" component={Kit} />
                <Route path="/charts" component={Chart} />
                <Route path="/ordersProducer" component={OrderProducer} />
                <Route path="/ordersClient" component={OrderClient} />
            </Switch>
        </BrowserRouter>
    )
    
}