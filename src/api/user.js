import request from "../utils/request";

export function login(data) {

    return request.post(
        "/users/login",
        data
    );

}

export function register(data) {

    return request.post(
        "/users/register",
        data
    );

}

export function getUserVO() {

    return request.get(
        "/users/my"
    );
}

export function logout() {
    return request.post(
        "/users/logout"
    )
}
