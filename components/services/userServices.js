import http from "./http_service";
const BASE_URL = {
  signUp: "/api/signup",
  login: "/api/login",
  addProperty: "/api/property",
  allProperty: "/api/allProperty",
  findPropertyForFrontEnd: "/api/findPropertyForDisplay",
  featuredOrActive: "/api/property",
  deleteProperty: "/api/property",
};

// Handle Login
export function handleLogin(values) {
  return http.post(BASE_URL.login, values);
}
// Delete Property
export function handleDeletingProperty(id) {
  return http.delete(BASE_URL.deleteProperty + `?id=${id}`);
}
export function getAllAcceptedAndActiveProperty() {
  return http.get(BASE_URL.findPropertyForFrontEnd);
}
export function handleSignUp(values) {
  return http.post(BASE_URL.signUp, values);
}
export function adminLoginHandler(values) {
  return http.post(BASE_URL.login, values);
}
export function addProperty(values) {
  return http.post(BASE_URL.addProperty, { values });
}
export function handleActiveOrFeatured(values, action) {
  return http.put(BASE_URL.featuredOrActive, { values, action });
}

export function getAllProperty() {
  return http.get(BASE_URL.allProperty);
}
