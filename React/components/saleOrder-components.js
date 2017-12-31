import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class SaleOrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = { saleOrder: {} };
        console.log('SaleOrderPage props', props);
    }

    componentDidMount() {
        //this.props.service.findById(this.props.saleOrderId).done(function (result) {
        //    this.setState({ saleOrder: result });
        //}.bind(this));
        this.setState({ saleOrder: this.props.service.findById(this.props.match.params.saleOrderId) });
    }

    render() {
        return (
            <div>
                <Header text="Sale Order Details" back="true" />
                <div className="card">
                    <ul className="table-view">
                        <li className="table-view-cell media">
                            <h1>{this.state.saleOrder.userName}</h1>
                            <p>{this.state.saleOrder.number}</p>
                        </li>
                        <li className="table-view-cell media">
                            <div className="media-body">
                                <h2>Company:</h2>
                                <h3>{this.state.saleOrder.companyName}</h3>
                                <h2>Saleperson:</h2>
                                <h3>{this.state.saleOrder.salePerson}</h3>
                            </div>
                        </li>
                        <li className="table-view-cell media">
                            <a href={"tel:" + this.state.saleOrder.officePhone} className="push-right">
                                <span className="media-object pull-left icon icon-call"></span>
                                <div className="media-body">
                                    Call Office
                                    <p>{this.state.saleOrder.officePhone}</p>
                                </div>
                            </a>
                        </li>
                        <li className="table-view-cell media">
                            <a href={"sms:" + this.state.saleOrder.mobilePhone} className="push-right">
                                <span className="media-object pull-left icon icon-sms"></span>
                                <div className="media-body">
                                    SMS
                                    <p>{this.state.saleOrder.mobilePhone}</p>
                                </div>
                            </a>
                        </li>
                        <li className="table-view-cell media">
                            <a href={"mailto:" + this.state.saleOrder.email} className="push-right">
                                <span className="media-object pull-left icon icon-email"></span>
                                <div className="media-body">
                                    Email
                                    <p>{this.state.saleOrder.email}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

class SaleOrderListItem extends Component{
    render() {
        return (
            <li className="table-view-cell media">
                <Link to={"/Detail/" + this.props.saleOrder.number}>
                    <i class="material-icons md-48">face</i>
                    {this.props.saleOrder.userName} ({this.props.saleOrder.number})
                </Link>
            </li>
        );
    }
}

class SaleOrderList extends Component {
    constructor(props) {
        super(props);
        //this.state = { saleOrders: [] };
        console.log('SaleOrderList props', props);
    }

    render() {
        var items = this.props.saleOrders.map(function (saleOrder) {
            return (
                <SaleOrderListItem key={saleOrder.number} saleOrder={saleOrder} />
            );
        });
        return (
            <ul className="table-view">
                {items}
            </ul>
        );
    }
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchKey: '' };
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event) {
        var searchKey = event.target.value;
        this.setState({ searchKey: searchKey });
        this.props.searchHandler(searchKey);
    }

    render() {
        return (
            <div className="bar bar-standard bar-header-secondary" >
                <input type="search" value={this.state.symbol} onChange={this.searchHandler} />
            </div>
        );
    }
}

class Header extends Component {
    render() {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back === "true" ? "" : " hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
}

const RouterComponent = (props) => (
    <Router basename="/React/SaleOrders">
        <div className="content">
            <Switch>
                <Route path="/Detail/:saleOrderId" render={({ match }) => <SaleOrderPage service={props.service} match={match} /> } />
                <Route render={() => <SaleOrderList saleOrders={props.saleOrders} />} />
            </Switch>
        </div>
    </Router>
);

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { saleOrders: [] };
        this.searchHandler = this.searchHandler.bind(this);
        console.log('HomePage props', props);
    }

    componentDidMount() {
        var self = this;
        this.props.service.saleOrdersLoaded = function (data) {
            console.log('saleOrdersLoaded');
            self.setState({ searchKey: '', saleOrders: data });
        };
    }

    //componentWillUnmount() { }

    searchHandler(key) {
        this.props.service.findByUserName(key).done(function (result) {
            this.setState({ searchKey: key, saleOrders: result });
        }.bind(this));
    }

    render() {
        return (
            <div>
                <Header text="Sale Orders" back="false" />
                <SearchBar searchHandler={this.searchHandler} />
                <div className="content">
                    <RouterComponent saleOrders={this.state.saleOrders} service={this.props.service} />
                </div>
            </div>
        );
    }
}

export default HomePage;