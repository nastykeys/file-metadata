var express = require('express');
var cors = require('cors');
const multer = require('multer')
require('dotenv').config()
const upload = multer({ dest: 'public/uploads/'})
var app = express();
const fs = require('fs')

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
  fs.unlink(req.file.path, err => {
    if(err){
      console.log(err)
    }
  })
})