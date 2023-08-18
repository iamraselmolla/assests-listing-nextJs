import http from "./http_service";
const BASE_URL = {
  signUp: "/api/signup",
  login: "/api/login",
  addProperty: "/api/property",
  allProperty: "/api/allProperty",
  findPropertyForFrontEnd: "/api/findPropertyForDisplay",
  featuredOrActive: "/api/property",
  deleteProperty: "/api/property",
  acceptProperty: "/api/acceptProperty",
  getAllAcceptedProperty: "/api/allApprovedProperty",
  getAwaitedProperties: "/api/allAwaitedProperty",
  getSingleProperty: "/api/getSigleProperty",
  galleryImage: '/api/gallery',
  addBlog: '/api/blog',
  getBlog: '/api/blog',
  getOneBlog: '/api/findSingleBlog',
  updateProperty: '/api/updateProperty',
};

// Update property by Admin 
export function updateAProperty(values){
  return http.put(BASE_URL.updateProperty, values)
}

// Find Single Blog
export function getASingleBlogPost(id){
  return http.get(BASE_URL.getOneBlog + `?id=${id}`)
}

// Find all Blogs
export function getAllBlogs (){
  return http.get(BASE_URL.getBlog);
}

// Add Blog
export function addBlogbyAdmin(values){
  return http.post(BASE_URL.addBlog, values)
}

// Find All Gallery Images
export function getAllGalleryImages (){
  return http.get(BASE_URL.galleryImage);
}
//
export function findAllAwaitedProperties() {
  return http.get(BASE_URL.getAwaitedProperties);
}

export function getAwaitedItem(id) {
  return http.get(BASE_URL.acceptProperty, { id });
}
// Accert Property
export function handleApprovePropertyByAdmin(id) {
  return http.put(BASE_URL.acceptProperty, { id });
}

// FindAll Approved Property
export function findAllProperyForAdmin() {
  return http.get(BASE_URL.getAllAcceptedProperty);
}

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

export function addProperty(values) {
  return http.post(BASE_URL.addProperty, { values });
}
export function handleActiveOrFeatured(values, action) {
  return http.put(BASE_URL.featuredOrActive, { values, action });
}

export function getAllProperty() {
  return http.get(BASE_URL.allProperty);
}

export function getPropertyById(id) {
  return http.get(BASE_URL.getSingleProperty + `?id=${id}`);
}
