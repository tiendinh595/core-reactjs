import {observable, computed, action} from 'mobx'
import * as ApiCaller from 'Utils/ApiCaller'

class UserStore {

    @observable current_user = null;
    @observable is_loading_user = false;
    @observable is_updating_user = false;

    @action
    pullUser() {
        return ApiCaller.get('/user')
            .then(data=>{
                if(data.status === 200)
                    this.setCurrentUser(data.data)

            })

    }

    @action
    setCurrentUser(user) {
        this.current_user = user;
    }
}

export default new UserStore();