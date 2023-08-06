import http from "./http_service";
const BASE_URL = {
  login: "/api/login",
  addProperty: "/api/property",
  allProperty: "/api/allProperty",
};

export function adminLoginHandler(values) {
  return http.post(BASE_URL.login, values);
}
export function addProperty(values) {
  return http.post(BASE_URL.addProperty, { values });
}

export function getAllProperty() {
  return http.get(BASE_URL.allProperty);
}
