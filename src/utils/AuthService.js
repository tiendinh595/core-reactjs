/**
 * Created by dinh on 11/29/17.
 */

export function login(token, profile) {
    localStorage.setItem('token', token)
    localStorage.setItem('profile', JSON.stringify(profile));
    // sessionStorage.token = token;
    // sessionStorage.profile = JSON.stringify(profile)
}

export function requiredAuth() {
    if(isLogged())
        return true;
    else {
        window.location.href = '/login'
    }
}

export function isLogged() {
    let token = localStorage.getItem('token');
    if (token === undefined || token === null) {
        logout();
        return false;
    }
    return true;
}

export function logout() {
    // delete sessionStorage.token;
    // delete sessionStorage.profile;

    localStorage.removeItem('token');
    localStorage.removeItem('profile');
}

export function getToken() {
    // return sessionStorage.token;
    return localStorage.getItem('token');
}