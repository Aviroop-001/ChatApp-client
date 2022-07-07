export const loginStart = (userInfo) =>({
    type: "LOGIN_START"
})

export const loginSuccess = (user) =>({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const loginFailure = () =>({
    type: "LOGIN_FAILURE"
})

export const logOut = () =>({
    type: "LOGOUT"
})