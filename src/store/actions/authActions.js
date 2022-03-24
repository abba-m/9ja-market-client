import { USER_LOADING,
 USER_LOADED, 
 AUTH_ERROR, 
 SET_SHOW_LOGIN,
 PROCESS_LOGIN, 
 LOGIN_FAIL, 
 LOGIN_SUCCESS, 
 LOGOUT_SUCCESS, } from "../types";

 export const userLoading = () => {
   return {
     type: USER_LOADING
   }
 }

 export const userLoaded = (payload) => {
   return {
     type: USER_LOADED,
     payload,
   }
 }

 export const processLogin = () => {
   return {
     type: PROCESS_LOGIN,
   }
 }

export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  }
}

export const authError = (errorMessage) => {
  return {
    type: AUTH_ERROR,
    payload: errorMessage,
  }
}

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export const setLoginFormOpenFunction = (payload) => {
  return {
    type: SET_SHOW_LOGIN,
    payload,
  }
}
