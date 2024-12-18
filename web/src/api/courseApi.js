import { handleResponse, handleError } from "./apiUtils";
const baseUrl = `${process.env.REACT_APP_COURSE_ADMIN_SERVER_URL}/courses`;

console.log('baseUrl: ', baseUrl);

export function getCourses() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveCourse(course) {
  return fetch(`${baseUrl}/${course.id || ""}`, {
    method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(course)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCourse(id) {
  return fetch(`${baseUrl}/${id}`, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
