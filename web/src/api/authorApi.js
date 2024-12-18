import { handleResponse, handleError } from "./apiUtils";
const baseUrl = `${process.env.REACT_APP_COURSE_ADMIN_SERVER_URL}/authors`;

console.log('baseUrl: ', baseUrl);

export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveAuthor(author) {
  return fetch(`${baseUrl}/${author.id || ""}`, {
    method: author.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(author)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAuthor(id) {
  return fetch(`${baseUrl}/${id}`, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
