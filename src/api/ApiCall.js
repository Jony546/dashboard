import qwest from "qwest";

export function Call(url, data = null) {
  const token = localStorage.getItem("token");
  var method = data ? "post" : "get";
  var xhr = qwest[method](url, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...(token ? { token } : {}),
    },
  })
    .then((xhr, response) => {
      return response;
    })
    .catch((error, xhr, response) => {
      response = JSON.parse(response);
      return Promise.reject(
        response.Mensaje
          ? response.Mensaje
          : response.Message
          ? response.Message
          : error
      );
    });
  return xhr;
}
