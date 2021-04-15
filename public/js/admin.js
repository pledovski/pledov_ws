const table = document.getElementById("shows-table");
table.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    let http = new EasyHTTP();
    let response = await http.delete(`/camshow/shows/${e.target.dataset.id}/`);
    if (response.success === true) {
      e.target.parentNode.parentNode.parentNode.remove();
    }
  }
  // if (e.target.classList.contains("actvate-record-btn")) {
  //   let http = new EasyHTTP();
  //   let response = await http.put(`/camshow/records/${e.target.dataset.id}/activate`);
  //   console.log(response);
  //   if (response.success === true) {
  //     alert(response.message);
  //   }
  // }
  // e.preventDefault();
});
