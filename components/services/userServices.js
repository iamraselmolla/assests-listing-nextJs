import http from "./http_service";
const BASE_URL = {
  login: "/api/login",
  addProperty: "/api/property",
};

export function adminLoginHandler(values) {
  return http.post(BASE_URL.login, values);
}
export function addProperty(values) {
  return http.post(BASE_URL.addProperty, { values });
}
