const express = require('express');
const path = require('path');

// Create our app
const app = express();

const port = process.env.PORT || 3000;

// app.use(function (req, res, next) {
//   if (req.headers['x-forwarded-proto'] === 'https') {
//     res.redirect(`http://${req.hostname}${req.url}`);
//   } else {
//     next();
//   }
// });

console.log(__dirname);

// use lets you add functionality to your server
// in this case static exposes the build folder
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express server is up on port ${port}`);
});
