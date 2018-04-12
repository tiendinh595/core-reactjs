/**
 * Created by dinh on 11/29/17.
 */
import axios from 'axios'
import commonStore from 'Stores/CommonStore'
import * as constants from 'Constants/index'

export function get(path, params = {}, cbUpload=(progressEvent)=>{}) {
    return request('get', path, params, cbUpload);
}

export function post(path, params = {}, cbUpload=(progressEvent)=>{}) {
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
    return axios({
        method: method,
        url: url,
        data: params,
        headers: {
            Authorization: `Bearer ${commonStore.token}`,
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Headers': '*',
            // Accept: 'application/json',
            // 'Content-Type': 'application/json',
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