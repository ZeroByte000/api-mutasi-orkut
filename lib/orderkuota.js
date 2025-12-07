// lib/orderkuota.js
const https = require("https");
const crypto = require("crypto");
const querystring = require("querystring");

function generateSignature(params, timestamp) {
  const formatted_params = [];
  let var_b = "";

  for (const key in params) {
    const value = params[key];
    if (key === "auth_token") {
      var_b = value;
    }
    formatted_params.push(value.length + String(value));
  }

  formatted_params.sort();
  const var_a = formatted_params.join("");
  const hash_input = timestamp + var_a;

  return crypto.createHash("sha512").update(hash_input).digest("hex");
}

function makeOrderkuotaRequest(path, params) {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now().toString();
    params.request_time = timestamp;
    const signature = generateSignature(params, timestamp);

    const postData = querystring.stringify(params);
    const options = {
      hostname: "app.orderkuota.com",
      path: path,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData),
        Signature: signature,
        Timestamp: timestamp,
        "User-Agent": "okhttp/4.12.0",
      },
    };

    const req = https.request(options, (res) => {
      let responseBody = "";
      res.on("data", (chunk) => {
        responseBody += chunk;
      });
      res.on("end", () => {
        try {
          const jsonResponse = JSON.parse(responseBody);
          resolve({ status: res.statusCode, body: jsonResponse });
        } catch (e) {
          reject(new Error("Gagal mem-parse response JSON: " + e.message));
        }
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

module.exports = { makeOrderkuotaRequest };
