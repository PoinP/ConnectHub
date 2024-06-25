export function fetchData(endPoint, method, bodyData) {
  return fetch(`http://localhost:8080/${endPoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(bodyData),
  });
}

export function fetchFormData(endPoint, method, formData) {
  return fetch(`http://localhost:8080/${endPoint}`, {
    method,
    mode: "cors",
    body: formData,
  });
}
