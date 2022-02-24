import axios from 'axios';
import jwt_decode from 'jwt-decode'
import router from '../router';

export const axiosApiInstance = axios.create()


axiosApiInstance.interceptors.request.use(async config => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    config.headers = {
        'Authorization': `Bearer ${userInfo.token}`
    }

    return config;
}, error => {
    Promise.reject(error)
});

axiosApiInstance.interceptors.response.use((response) => {
    return response;
}, async function (error) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let decode = null

    const tt = new Date();
    const now = tt.getTime() / 1000

    try {
        decode = jwt_decode(userInfo.token)

        const toExp = decode.exp
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._retry) { // Token Expiré

            //Je récupère le temps 

            if (now < toExp + (5 * 60)) {
                originalRequest._retry = true;
                const newAccessToken = await refreshAccessToken(userInfo);
                userInfo.token = newAccessToken
                localStorage.setItem('userInfo', JSON.stringify(userInfo))

                return axiosApiInstance(originalRequest);
            }

        }


    } catch (e) {
        logout()
        return Promise.reject(error)
    }
})


async function refreshAccessToken(userInfo) {
    return axios
        .create()
        .post("http://localhost:8888/auth/refresh",
            { id: userInfo.user.id },
            {
                headers: {
                    Authorization: `Bearer ${userInfo.refreshToken}`,
                },
            })
        .then(rt => {
            return rt.data.accessToken
        })
        .catch((e) => {
            console.log(e)
            return e
        })
}

function logout() {
    localStorage.removeItem("userInfo")
    router.push('/login')
}