const ErrorResponse = require("../../utils/errorResponse");
const Discogs = require("disconnect").Client;

const discogs = new Discogs({ userToken: `${process.env.DISCOGS_TOKEN}` });

const get_release = async (release_id) => {
  try {
    let release_data = await discogs.database().getRelease(release_id);
    release_data.suggested_price = await get_price(release_id);
    return release_data;
  } catch (err) {
    console.log(err);
  }
};

const get_price = async (release_id) => {
  try {
    let price = await discogs.marketplace().getPriceSuggestions(release_id);
    return price;
  } catch (err) {
    console.log(err);
  }
};

exports.get_record = async (req) => {
  let release_id = req.body.discogs_url.split("/").pop();

  let release_data = await get_release(release_id);

  let record_data = {
    show_id: req.body.show_id,
    price: req.body.price,
    discogs_url: req.body.discogs_url,
    condition: req.body.condition,
    release_id: release_id,
    artist: release_data.artists_sort,
    title: release_data.title,
    style: release_data.styles[0],
    year: release_data.released,
    image: release_data.images[0].uri,
  };

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
        if (recordRating > min && recordRating < max && reasonablePrice <= maxPrice) {
          mostWanted.push(record);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  res.status(200).send({ successful: true, count: mostWanted.length, data: mostWanted });
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
