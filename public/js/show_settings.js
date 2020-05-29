const record_form = document.getElementById("record-form");
const record_table = document.getElementById("record-table");

record_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const discogs_url = document.getElementById("record-url").value;
  const price = document.getElementById("record-price").value;
  const condition = document.getElementById("record-condition").value;
  const show_id = window.location.href.split("/").pop();
  let http = new EasyHTTP();

  let response = await http.post("/camshow/records", {
    show_id,
    price,
    condition,
    discogs_url,
  });
  console.log(response);
});

record_table.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-record-btn")) {
  }
  let http = new EasyHTTP();
  let response = await http.delete(`/camshow/records/${e.target.id}/`);
  if (response.success === true) {
    e.target.closest("tr").remove();
  }
  e.preventDefault();
});
