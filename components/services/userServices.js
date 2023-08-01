import http from "./http_service";
const BASE_URL = {
  login: '/api/login',
}



export function adminLoginHandler(values) {
  return http.post(BASE_URL.login, values)
}

