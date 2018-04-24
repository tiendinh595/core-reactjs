import {observable, computed, action} from 'mobx'

class CommonStore {

    @observable token = window.localStorage.getItem('jwt');

    @observable app_loaded = false;

    @action
    setToken(token) {
        this.token = token;
        window.localStorage.setItem('jwt', token)
    }

    @action
    removeToken() {
        this.token = null;
        window.localStorage.removeItem('jwt')
    }

    @action
    setAppLoaded() {
        this.app_loaded = true;
    }
}

export default new CommonStore()