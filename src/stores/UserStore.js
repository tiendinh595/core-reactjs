import {observable, computed, action} from 'mobx'
import * as ApiCaller from 'Utils/ApiCaller'
import {commonStore} from 'Stores'

class UserStore {

    @observable current_user = null;
    @observable is_loading_user = false;
    @observable is_updating_user = false;

    @action
    pullUser() {
        return ApiCaller.get('/profile')
            .then(data => {
                if (data.code === 200)
                    this.setCurrentUser(data.data)
                else
                    commonStore.removeToken()
            })
            .catch(err=>commonStore.removeToken())

    }

    @action
    setCurrentUser(user) {
        this.current_user = user;
    }
}

export default new UserStore();