const record_form = document.getElementById("record-form");
const record_table = document.getElementById("record-table");

// let easyHTTP = {
//   // Make an HTTP POST Request
//   async post(url, body) {
//     const headers = { "X-Requested-With": "XMLHttpRequest" };
//     if (typeof body == "object" && body.constructor == Object) {
//       headers["Content-Type"] = "application/json";
//       body = JSON.stringify(body);
//     }
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers,
//         body,
//       });
//       let res_data = await response.json();
//       return res_data;
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   // Make an HTTP PUT Request
//   async put(url, body) {
//     const headers = { "X-Requested-With": "XMLHttpRequest" };
//     if (typeof body == "object" && body.constructor == Object) {
//       headers["Content-Type"] = "application/json";
//       body = JSON.stringify(body);
//     }
//     try {
//       const response = await fetch(url, {
//         method: "PUT",
//         headers,
//         body,
//       });
//       return response;
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   // Make an HTTP GET Request
//   async get(url) {
//     const response = await fetch(url);
//     const resData = await response.json();
//     return resData;
//   },
//   async getText(url) {
//     const response = await fetch(url);
//     const resData = await response.text();
//     return resData;
//   },

//   // Make an HTTP DELETE Request
//   async delete(url) {
//     try {
//       const response = await fetch(url, {
//         method: "DELETE",
//       });
//       let resData = await response.json();
//       return resData;
//     } catch (error) {
//       toggleSnackbar(false, error.message);
//       console.log(error);
//     }
//   },
// };

record_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let response = await easyHTTP.post("/camshow/records", {
    discogs_url: document.getElementById("record-url").value,
    price: document.getElementById("record-price").value,
    condition: document.getElementById("record-condition").value,
    show_id: window.location.href.split("/").pop(),
  });

  alert(response.message);
  location.reload();
});

record_table.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-record-btn")) {
    let response = await easyHTTP.delete(`/camshow/records/${e.target.dataset.id}/`);
    if (response.success === true) {
      e.target.closest("tr").remove();
    }
    alert(response.message);
  }
  if (e.target.classList.contains("actvate-record-btn")) {
    let response = await easyHTTP.put(`/camshow/records/${e.target.dataset.id}/activate`, {});
    alert(response.message);
    if (response.success === true) {
      location.reload();
    }
  }
});
