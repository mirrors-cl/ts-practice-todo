import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

export interface  Result<T = any> {
  code: number;
  message: string;
  result: T;
}


// 封装axios
class VAxios  {
  // axios实例
  private instance: AxiosInstance;
  // 构造函数
  constructor(config: AxiosRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    this.setupInterceptors();
  }
  // 设置拦截器
  private setupInterceptors(){
    // 请求拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse<Result>) =>{
        const {data} = res;
        if(data.code === 200){
          return data as any;
        }else{
          return Promise.reject(data)
        }
      },
      (error) =>{
        return Promise.reject(error);
      }
    )
  }
  // get请求
  public get<T = any>(config:AxiosRequestConfig): Promise<Result<T>>{
    return this.instance.request({ ...config, method: 'GET' });
  }
  public post<T = any>(config:AxiosRequestConfig): Promise<Result<T>>{
    return this.instance.request({ ...config, method: 'POST' });
  }
}
// 修改前：写死了 '/api'
// export const defHttp = new VAxios({
//   baseURL: '/api',
//   timeout: 10000,
// })
export const defHttp = new VAxios({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
})