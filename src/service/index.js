import { create } from 'apisauce'
import { storeData, getData } from '../storage'
import { base_url } from './endpoints'

export const api = create({
    baseURL: base_url
})

const hit = async (endpoint = "", method = "GET", body = {},axiosConfig={}) => {
    let x = ""
    const tokens = await getData("@token");
    console.log(tokens)
    if (tokens) {
        api.headers['Authorization'] = `${tokens}`;
    }
    switch (method.toLowerCase()) {
        case "get":
            x = await api.get(endpoint, body)
            break
        case "post":
            x = await api.post(endpoint, body)
            break
        case "patch":
            x = await api.patch(endpoint, body)
            break
        case "delete":
            x = await api.delete(endpoint, body)
            break
    }
   
    // refreshing the tokens
    // let refresh = tokens?.refresh
    // if (x.status === 401&&refresh) {
    //     const newToken = await api.post(base_url+auth['refresh-tokens'],{refreshToken: refresh.token})
    //     if(newToken.status==200){
    //         await storeData("@tokens",newToken.data)
    //         let config=x.config
    //         config.headers["Authorization"]= `bearer ${newToken.data.access.token}`;
    //         x = await api.any(config)
    //     }else{
    //         // await storeData("@tokens",null)
    //     }
    // }
    console.log(endpoint,x)
    switch (x.problem) {
        case null:
            return { err: false, data: x.data.data,msg:x.data.message, status: x.status }
        case "CLIENT_ERROR":
            return { err: true, msg: x.data.message, status: x.status }
        case "SERVER_ERROR":
            return { err: true, msg:  x?.data?.message?x?.data?.message:"SERVER_ERROR", status: x.status }
        default:
            return { err: true, msg: x.problem, status: x.status }
    }
}

export default hit