import React, {Component, Fragment} from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import {inject, observer} from 'mobx-react'

//import page
import NotMatch from 'Components/NotMatch'
import Home from 'Components/Home'
import About from 'Components/About'

//import components
import LoadingSpinner from 'Components/Common/LoadingSpinner'

@inject('commonStore', 'userStore')
@observer
class App extends React.Component {

    constructor(props) {
        super(props)

    }

    componentWillMount() {
        if (!this.props.commonStore.token)
            this.props.commonStore.setAppLoaded();
    }

    componentDidMount() {
        if (this.props.commonStore.token) {
            this.props.userStore.pullUser()
                .finally(() => this.props.commonStore.setAppLoaded())
        }
    }

    render() {
        if(this.props.commonStore.app_loaded) {
            return (
                <Fragment>
                    {renderRoutes(this.props.userStore.current_user)}
                </Fragment>
            )
        }
        return <LoadingSpinner />
    }
}

function renderRoutes(user) {
    const requireAuthenticated = (component) => user === null ? redirect('/login') : component;
    const requireUnAuthenticated = (component) => user !== null ? redirect('/home') : component;

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={requireAuthenticated(About)}/>
                <Route component={NotMatch}/>
            </Switch>
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