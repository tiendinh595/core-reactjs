import React, {Component, Fragment} from 'react'
import {Switch, Route, BrowserRouter, withRouter} from 'react-router-dom'
import {inject, observer} from 'mobx-react'

//import page
import NotMatch from 'Components/NotMatch'
import Home from 'Components/Home'
import ProductDetail from 'Components/Product/ProductDetail'
import ProductAdd from 'Components/Product/ProductAdd'
import {
    Login,
    Register
} from 'Components/User/'

//import components
import LoadingSpinner from 'Components/Common/LoadingSpinner'

@withRouter
class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}


@inject('commonStore', 'userStore')
@observer
class App extends React.Component {

    constructor(props) {
        super(props)

    }

    componentWillMount() {
        if (!this.props.commonStore.token)
            this.props.commonStore.setAppLoaded();
        else {
            this.props.userStore.pullUser()
                .finally(() => this.props.commonStore.setAppLoaded())
        }
    }

    componentDidMount() {

    }

    render() {
        if (this.props.commonStore.app_loaded) {
            return (
                <Fragment>
                    {renderRoutes(this.props.userStore.current_user)}
                </Fragment>
            )
        }
        return <LoadingSpinner/>
    }
}

function renderRoutes(user) {
    const requireAuthenticated = (component) => user === null ? redirect('/login') : component;
    const requireUnAuthenticated = (component) => user !== null ? redirect('/') : component;

    return (
        <BrowserRouter>
            <ScrollToTop>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/dang-tin-ban-nha-dat" component={requireAuthenticated(ProductAdd)}/>
                    <Route exact path="/product/:id/:slug" component={ProductDetail}/>
                    <Route exact path="/login" component={requireUnAuthenticated(Login)}/>
                    <Route exact path="/register" component={requireUnAuthenticated(Register)}/>
                    <Route exact path="/about" component={requireAuthenticated(Login)}/>
                    <Route component={NotMatch}/>
                </Switch>
            </ScrollToTop>
        </BrowserRouter>
    )
}

function redirect(location) {
    return class RedirectRouter extends React.PureComponent {
        constructor(props) {
            super(props);
            window.location.href = location;
        }

        render = () => null
    }
}

export default App;