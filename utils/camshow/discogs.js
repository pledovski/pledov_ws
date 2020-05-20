const Discogs = require("disconnect").Client;

const get_release = async (release_id) => {
  const db = new Discogs({
    userToken: `${process.env.DISCOGS_TOKEN}`,
  }).database();

  let price = await get_price(release_id);

  try {
    let release_data = await db.getRelease(release_id);
    release_data.suggested_price = price;
    return release_data;
  } catch (err) {
    console.log(err);
  }
};

const get_price = async (release_id) => {
  let mp = new Discogs({
    userToken: `${process.env.DISCOGS_TOKEN}`,
  }).marketplace();

  try {
    let price = await mp.getPriceSuggestions(release_id);
    return price;
  } catch (err) {
    console.log(err);
  }
};

exports.create_record = async (req) => {
  let release_id = req.body.discogs_uri.split("/").pop();
  let release_data = await get_release(release_id);

  let record_data = {};
  record_data.show = req.body.show;
  record_data.price = req.body.price;
  record_data.condition = req.body.condition;
  record_data.release_id = release_id;
  record_data.discogs_uri = req.body.discogs_uri;
  record_data.artist = release_data.artists_sort;
  record_data.title = release_data.title;
  record_data.style = release_data.styles[0];
  record_data.year = release_data.released;

  // Debt
  // record_data.price_discogs = release_data.suggested_price;
  // record_data.cover_art = release_data.images[0];
  record_data.label = release_data.labels[0].name;
  // record_data.owner = req.body.user.name;

  return record_data;
};

exports.getSeller = async (req, res) => {
  let mp = new Discogs({
    userToken: `${process.env.DISCOGS_TOKEN}`,
  }).marketplace();
  let page = req.body.page;
  let seller = await mp.getInventory(req.body.seller, { page, per_page: 100 });
  res.status(200).send({ successful: true, data: seller });
};

exports.getMostWanted = async (req, res) => {
  let mp = new Discogs({
    userToken: `${process.env.DISCOGS_TOKEN}`,
  }).marketplace();

  let min = req.body.min;
  let max = req.body.max;
  let mostWanted = [];
  let maxPages = 1;
  let maxPrice = 10;
  for (let i = 1; i <= maxPages; i++) {
    try {
      let recordsOnPage = await mp.getInventory(req.body.seller, {
        page: i,
        per_page: 100,
      });
      // maxPages = recordsOnPage.pagination.pages

      for (const record of recordsOnPage.listings) {
        let recordRating =
          (record.release.stats.community.in_wantlist * 100) /
          record.release.stats.community.in_collection;
        let reasonablePrice = record.price.value;
        if (
          recordRating > min &&
          recordRating < max &&
          reasonablePrice <= maxPrice
        ) {
          mostWanted.push(record);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  res
    .status(200)
    .send({ successful: true, count: mostWanted.length, data: mostWanted });
};

exports.getWantlist = async (req, res) => {
  let wl = new Discogs({
    userToken: `${process.env.DISCOGS_TOKEN}`,
  }).wantlist();

  try {
    let user = req.body.user;
    let wantlist = await wl.getReleases(user);
    res.status(200).send({ successful: true, data: wantlist.wants[1] });
  } catch (err) {
    console.log(err);
  }
};

exports.get_release = get_release;
