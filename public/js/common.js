//COMMON
let q = document.querySelector.bind(document);
let qa = document.querySelectorAll.bind(document);

let width = window.innerWidth > 0 ? window.innerWidth : screen.width;

let easyHTTP = {
  // Make an HTTP POST Request
  async post(url, body) {
    const headers = { "X-Requested-With": "XMLHttpRequest" };
    if (typeof body == "object" && body.constructor == Object) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  // Make an HTTP PUT Request
  async put(url, body) {
    const headers = { "X-Requested-With": "XMLHttpRequest" };
    if (typeof body == "object" && body.constructor == Object) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    }
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body,
      });
      let res_data = await response.json();
      return res_data;
    } catch (err) {
      console.log(err);
    }
  },
  // Make an HTTP GET Request
  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  },
  async getText(url) {
    const response = await fetch(url);
    const resData = await response.text();
    return resData;
  },

  // Make an HTTP DELETE Request
  async delete(url) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      let resData = await response.json();
      return resData;
    } catch (error) {
      toggleSnackbar(false, error.message);
      console.log(error);
    }
  },
};
