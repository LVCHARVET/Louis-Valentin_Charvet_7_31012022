// import axios from 'axios'
// import jwt_decode from 'jwt-decode'
// import router from '../router';

// export function jwtInterceptor() {
//     axios.interceptors.request.use(async config => {

//     }) 
// }


    // let decode = jwt_decode(userInfo.token)

    // let tt = new Date();
    // let now = tt.getTime() / 1000
    // let toExp = decode.exp
    // // Test si le token principal is dead
    // if (now > toExp) {
    //     // Bon mais si il est dead dans les 5 dernières minutes de son heure d'expiration (token.exp = 11h00 donc on entre 11h00 et 11h05)
    //     // SI c'est le cas c'est comme si le code va tout seul à la page login pour se logger now < toExp + (5 * 60)
    //     if (now < toExp + (5 * 60)) {
    //         // Ici je me relogue grace au refreshToken
    //         const newToken = await refresher(userInfo)
    //         this.userInfo.token = newToken
    //         localStorage.setItem('userInfo', JSON.stringify(userInfo))
    //         request.headers["Authorization"] = 'Bearer ' + userInfo.token;
    //         return request

    //     } else {
    //         console.log('actual < toExp + (5 * 60)')
    //         localStorage.removeItem("userInfo")
    //         router.go()
    //         userInfo = false
    //     }

    // } else if (userInfo) {
    //     request.headers["Authorization"] = 'Bearer ' + userInfo.token;
    //     return request
    // }