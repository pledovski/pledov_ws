const record_form = document.getElementById("record-form");
const discogs_url = document.getElementById("record-url").value;
const price = document.getElementById("record-price").value;
const condition = document.getElementById("record-condition").value;
const show_id = window.location.href.split("/").pop();
let http = new EasyHTTP();

record_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log({ show_id, price, discogs_url });
  let response = await http.post("/camshow/records", {
    show_id,
    price,
    discogs_url,
  });
  console.log(response);
});
