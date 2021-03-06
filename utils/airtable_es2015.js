require("isomorphic-fetch");

exports.hydrateFromAirtable = exports.writeFeedback = undefined;

var airtableConstants = require("./airtable_constants");
var readKey = process.env.AIRTABLE_READ_KEY;
var writeKey = process.env.AIRTABLE_WRITE_KEY;

var fetchTableFromAirtable = async function fetchTableFromAirtable(table) {
  var offset = undefined;
  var jsonRecords = [];
  do {
    var url =
      "https://api.airtable.com/v0/appoFDwVvNMRSaO6o/" +
      table +
      "?view=Grid%20view";
    if (offset) {
      url = url + "&offset=" + offset;
    }
    var resp = await fetch(url, {
      headers: {
        Authorization: "Bearer " + readKey
      }
    });
    var json = await resp.json();
    jsonRecords = jsonRecords.concat(json.records);
    offset = json.offset;
  } while (offset);

  return jsonRecords.map(function(item) {
    return item.fields;
  });
};

var hydrateFromAirtable = (exports.hydrateFromAirtable = async function hydrateFromAirtable() {
  let dataStore = {};
  airtableConstants.tableNames.forEach(function(tableName) {
    dataStore[tableName] = [];
  });

  let promises = airtableConstants.tableNames.map(async function(tableName) {
    dataStore[tableName] = await fetchTableFromAirtable(tableName);
  });
  await Promise.all(promises);

  airtableConstants.tableNames.forEach(function(tableName) {
    var array = dataStore[tableName].map(x => Object.keys(x).length);
    var number_of_fields = Math.max(...array);
    dataStore[tableName] = dataStore[tableName].filter(x => {
      var fraction_of_cols_filled =
        (Object.keys(x).length * 1) / number_of_fields;
      return fraction_of_cols_filled < 0.5 ? false : true;
    });
  });
  dataStore.timestamp = await Date.now();
  return dataStore;
});

var writeFeedback = (exports.writeFeedback = async function writeFeedback(
  payload
) {
  var url = "https://api.airtable.com/v0/appoFDwVvNMRSaO6o/feedback";
  var resp = await fetch(url, {
    body: JSON.stringify({ fields: payload }),
    cache: "no-cache",
    headers: {
      Authorization: "Bearer " + writeKey,
      "content-type": "application/json"
    },
    method: "POST"
  });
  return await resp.json();
});
