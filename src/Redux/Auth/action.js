import { LOGIN } from "./actionTypes";


const login = (data) => {
    const login = (data) => {
        return {
            type: LOGIN,
            details: data
        }
    }
    return (dispatch) => {
        dispatch(login(data));
    }
}

export { login };

// import {GRAPH_REQUESTS, isIE, msalApp} from "../../../components/Authentication/auth-utils";
// import {AuthState} from "./reducer";

// function login(authDetails = {},redirect = isIE()) {
//     const req = () => {
//         return {
//             type: AuthState.LOGIN_REQUEST
//         }
//     }
//     return async (dispatch) => {
//         dispatch(req());
//         if (redirect) {
//             return msalApp(authDetails.tenantId).loginRedirect(GRAPH_REQUESTS.LOGIN);
//         }
//         return msalApp(authDetails.tenantId).loginRedirect(GRAPH_REQUESTS.LOGIN);
//     }
// }

// function logout(errorMsg = "", lastPath=""){
//     const request = () => {
//         return {
//             type: AuthState.LOGOUT_REQUEST
//         }
//     }

//     const logoutAction = (errorMsg) => {
//         return {
//             type: errorMsg === "" ? AuthState.NOT_LOGGED_IN : AuthState.LOGIN_ERROR,
//             lastPath: lastPath,
//             errorMsg: errorMsg
//         }
//     }
//     return (dispatch) => {
//         dispatch(request());
//         sessionStorage.clear();
//         dispatch(logoutAction(errorMsg));
//     }
// }
// function checkToken(urlPath="") {
//     const tokenExpried = () => {
//         return {
//             type: AuthState.TOKEN_EXPIRED,
//             urlPath: urlPath
//         }
//     }

//     return (dispatch) => {
//         dispatch(tokenExpried());
//     }
// }


// function checkPermission() {

//     const listOfPermissions = {
//         administration: {
//             organizationList: {
//                 create: true,
//                 edit: true,
//                 delete: true,
//                 view: true,
//             },
//             userList: {
//                 create: true,
//                 edit: true,
//                 delete: true,
//                 view: true,
//             },
//             roleList: {
//                 create: true,
//                 edit: true,
//                 delete: true,
//                 view: true,
//             },
//             modelList: {
//                 create: true,
//                 edit: true,
//                 delete: true,
//                 view: true,
//             },
//             vmImageList: {
//                 create: true,
//                 edit: true,
//                 delete: true,
//                 view: true,
//             },
//             extensionList: {
//                 create: true,
//                 edit: true,
//                 delete: true,
//                 view: true,
//             },
//         },
//             blueprintList: true,
//             deploymentList: true,
//             organizationBlueprints: true,
//             costManagement: true,
//             organizationList: true,
//             userList: true,
//             roleList: true,
//             modelList: true,
//             vmImageList: true,
//             extensionList: true,
//     }

//     return { ...listOfPermissions };
// }

// function updatePermission(permission, key) {
//     const update = () => {
//         return {
//             type: AuthState.UPDATE_PERMISSION,
//             permission: permission,
//             key:key
//         }
//     }

//     return (dispatch) => {
//         dispatch(update());
//     }
// }

// function updateTenantId(Id) {
//     const update = () => {
//         return {
//             type: AuthState.UPDATE_TENANTID,
//             id: Id
//         }
//     }

//     return (dispatch) => {
//         dispatch(update());
//     }
// }

// function switchDirectory() {
//     const update = () => {
//         return {
//             type: AuthState.SWITCH_DIRECTORY
//         }
//     }

//     return (dispatch) => {
//         dispatch(update());
//     }
// }

// function SetProvider(provider, email) {
//     const set = () => {
//         return {
//             type: AuthState.SET_PROVIDER,
//             provider: provider,
//             "aws-auth" : email
//         }
//     }

//     return (dispatch) => {
//         dispatch(set());
//     }
// }

export const AuthActions = {
    login,
    // logout,
    // checkPermission,
    // checkToken,
    // updatePermission,
    // updateTenantId,
    // switchDirectory,
    // SetProvider
}