import { defHttp } from "../utils/http";

interface LoginResult {
    token: string;
    usename: string;
    role: 'admin' | 'user'
}

export function loginApi(params: { account: string; password: string }) {
    return defHttp.post<LoginResult>({
        url: '/login',
        data: params
    });
}   

