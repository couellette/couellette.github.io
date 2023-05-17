var express = require("express");
var multer = require('multer');
var fs = require('fs');
var fse = require('fs-extra');
var mkdirp = require('mkdirp');

var app = express();

app.use(express.static(__dirname));

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './fileupload');
    },
    filename: (req, file, callback) => {
        callback(null, 'data.csv');
    }
});


var upload = multer({
    storage: storage
}).array('files', 100);


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");


});
app.post('/new_data', (req, res) => {

    upload(req, res, err => {

        var folder_name = __dirname + '/data/' + req.body.db_name

        //console.log(folder_name);
        mkdirp(folder_name, err => {
            if (err) console.error(err)
            else console.log('Directory made')
        });

        //console.log(req.body.db_name);
        //console.log(req.files);
        directory = __dirname + '/lastplayed/'
        var data_name = req.body.db_name
            // var execute = "script.py -d " + directory + " -x http://10.184.44.243:9201 -i " + elasticDB_name
            // console.log(execute)

        if (err) {
            return res.end("Error uploading file.");
        }
        res.redirect('/' + "?data=" + data_name); // go to this page

        // for (var i in req.files) {

        //     res.end("File is uploaded " + req.files[i].originalname);
        //     //   console.log(req.files[i].originalname); 
        // }


        fse.copy(directory, folder_name, err => {
            if (err) return console.error(err)
            console.log('success!')
        });
        setTimeout(() => {
            for (var i in req.files) {
                fs.unlink(directory + 'data.csv', err => {
                    if (err) return console.error(err)
                    console.log('deleted!')
                });
            }
        }, 100);
    });
});
// start server on port 3210
app.listen(3210);