import {observable, computed, action} from 'mobx'
import * as ApiCaller from 'Utils/ApiCaller'
import {
    commonStore,
    userStore
} from 'Stores'

class AuthStore {

    @observable in_progress = false;
    @observable errors = undefined;

    @observable payload = {
        username: '',
        password: '',
    };

    @action
    setUsername(username){
        this.payload.username = username;
    }

    @action
    setPassword(password){
        this.payload.password = password;
    }

    @action
    reset(){
        this.payload.username = '';
        this.payload.password = '';
    }

    @action
    login() {
        this.in_progress = true;
        this.is_loading_profile = true;
        ApiCaller.post('/user/login', this.payload)
            .then((data)=>{
                if(data.status === 200) {
                    commonStore.setToken(data.data.token);
                    userStore.setCurrentUser(data.data);
                }
            })
            .catch((error)=>{
                this.errors = error;
                this.in_progress = false;
            })
            .finally(()=>this.is_loading_profile=false)
    }

}

export default new AuthStore();