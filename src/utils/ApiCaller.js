/**
 * Created by dinh on 11/29/17.
 */
import axios from 'axios'
import commonStore from 'Stores/CommonStore'
import * as constants from 'Constants/index'
import queryString from  'query-string'

export function get(path, params = {}, cbUpload=(progressEvent)=>{}) {
    return request('get', path, params, cbUpload);
}

export function post(path, params = {}, cbUpload=(progressEvent)=>{}) {
    console.log(cbUpload)
    return request('post', path, params, cbUpload);
}

export function put(path, params = {}, cbUpload=(progressEvent)=>{}) {
    return request('put', path, params, cbUpload);
}

export function remove(path, params = {}, cbUpload=(progressEvent)=>{}) {
    return request('delete', path, params, cbUpload);
}

function request(method, path, params = {}, cbUpload=(progressEvent)=>{}) {
    const url = path.indexOf('http') === -1 ? `${constants.API_URI}${path}` : path;
    let data_send = new FormData();
    for(let k in params) {
        data_send.append(k, params[k])
    }
    return axios({
        method: method,
        url: url,
        // data: queryString.stringify(params),
        data: data_send,
        headers: {
            Authorization: `${commonStore.token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
            // 'Content-Type': 'application/x-www-form-urlencoded'

            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        onUploadProgress: function(progressEvent) {
            // var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            // console.log('percentCompleted')
            // console.log(percentCompleted)
            cbUpload(progressEvent);
        }
    })
        .then(res=> res.data)

}