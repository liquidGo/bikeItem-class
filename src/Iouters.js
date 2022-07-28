import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Ad from './Ad'
import App from './App'
import Home from './pages/home'
import Buttons from './UI/buttons'
import Modus from './UI/Modus'
import Loading from './UI/Loading'
import NoMatch from './pages/NoMatch'
import Notice from './UI/Notice'
import Messages from './UI/Messages'
import Tabs1 from './UI/Tabs'
import Gallery from './UI/Gallery'
import Carouser from './UI/Carouser'
import Login from './pages/form/Login'
import Rigister from './pages/form/Rigister'
import BaseTable from './pages/table/BaseTable'
import HightTable from './pages/table/HightTable'
import City from './pages/city/City'
import Order from './pages/order/Order'
import User from './pages/user/User'
import Common from './Common'
import Order_details from './pages/order/Order_details'
import Map from './pages/map/Map'
import Bar from './pages/echarts/bar/Bar'

export default class Iouters extends Component {

    render() {
        return (
            <div>
                <Router>
                    <Ad>
                        <Route path='/admin'
                            render={() =>
                                <App>
                                    <Switch>
                                        <Route path='/admin/home' component={Home}> </Route>
                                        <Route path='/admin/ui/buttons' component={Buttons}></Route>
                                        <Route path='/admin/ui/modals' component={Modus}></Route>
                                        <Route path='/admin/ui/loadings' component={Loading}></Route>
                                        <Route path='/admin/ui/notification' component={Notice}></Route>
                                        <Route path='/admin/ui/tabs' component={Tabs1}></Route>
                                        <Route path='/admin/ui/messages' component={Messages}></Route>
                                        <Route path='/admin/ui/gallery' component={Gallery}></Route>
                                        <Route path='/admin/ui/carousel' component={Carouser}></Route>
                                        <Route path='/admin/form/login' component={Login}></Route>
                                        <Route path='/admin/form/reg' component={Rigister}></Route>
                                        <Route path='/admin/table/basic' component={BaseTable}></Route>
                                        <Route path='/admin/table/high' component={HightTable}></Route>
                                        <Route path='/admin/city' component={City}></Route>
                                        <Route path='/admin/order' component={Order}></Route>
                                        <Route path='/admin/user' component={User}></Route>
                                        <Route path='/admin/bikemap' component={Map}></Route>
                                        <Route path='/admin/charts/bar' component={Bar}></Route>
                                        <Route component={NoMatch}></Route>
                                    </Switch>
                                </App>
                            }
                        />
                        <Route path='/common' render={() =>
                            <Common>
                                <Route path='/common/detail/:status/:order_sn/:bike_sn/:user_name/:distance' component={Order_details}></Route>
                            </Common>
                        }
                        >
                        </Route>
                    </Ad>
                </Router>
            </div>
        )
    }
}
