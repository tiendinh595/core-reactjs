import {observable, computed, action} from 'mobx'
import * as ApiCaller from 'Utils/ApiCaller'

class ProfileStore {

    @observable is_loading_profile = false;
    @observable profile = null;

    @action
    getProfile(id) {
        this.is_loading_profile = true;
        ApiCaller.get(`/user/{id}`)
            .then(profile=>this.profile = profile)
            .finally(()=>this.is_loading_profile=false)
    }

}

export default new ProfileStore();