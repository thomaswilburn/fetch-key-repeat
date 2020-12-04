const express = require("express");
const app = express();

var getKey = require("./word-of-the-day.js");

var storage = {};
var SIZE_LIMIT = 10 * 1024;
var TIME_LIMIT = 1000 * 60 * 60; // one hour

var evict = function() {
  var now = Date.now();
  var limit = now - TIME_LIMIT;
  for (var [key, entry] of Object.entries(storage)) {
    if (entry.time < limit) {
      delete storage[key];
      console.log("Evicted entry for key ", key);
    }
  }
}

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:key", (request, response) => {
  console.log(`Got request for key ${request.params.key}`);
  response.set("Access-Control-Allow-Origin", "*");
  var entry = storage[request.params.key];
  if (!entry) return response.status(404).send("No entry for that key");
  response.send(entry.value);
  evict();
});

app.post("/new", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  var length = request.get("Content-Length") * 1;
  if (length > SIZE_LIMIT) return response.status(403).send("Body length is too large");
  var time = Date.now();
  var body = [];
  var aborted = false;
  length = 0;
  request.on("data", function(chunk) {
    length += chunk.length;
    if (length > SIZE_LIMIT) {
      console.log("Request exceeded allowable data size");
      return request.destroy();
    }
    body.push(chunk);
  });
  request.on("end", function() {
    var value = Buffer.concat(body);
    var key = getKey();
    console.log(`Storing ${value.length} bytes as ${key}`);
    storage[key] = { time, value };
    response.send({ key });
  })
});

const listener = app.listen(8082, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
