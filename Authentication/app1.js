const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

// THIS IS  USED FOR ENCRYPTING THE PASSWORD //

// app.get("/", (req, res) => {
//   bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash("myPlaintextPassword", salt, function (err, hash) {
//       console.log(hash);
//     });
//   });
// });

// THIS  METHOD  IS USED FOR COMPARING THE PASSWORD //

// app.get("/", (req, res) => {
//   bcrypt.compare(
//     "myPlaintextPassword",
//     "$2b$10$pwOYbPkDNNI7IX5ldPC8TOwrBqwzN/Eqsr/bmvU6ELV/ZJqPzRVIq",
//     function (err, result) {
//       console.log(result);
//     }
//   );
// });

app.listen(3000);
