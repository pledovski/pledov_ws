const table = document.getElementById("shows-table");
table.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    let http = new EasyHTTP();
    let response = await http.delete(`/camshow/shows/${e.target.id}/`);
    if (response.success === true) {
      e.target.parentNode.parentNode.parentNode.remove();
    }
    e.preventDefault();
  }
});
