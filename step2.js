const fs = require("fs");
const axios = require("axios");
const argv = process.argv;

for (let i = 0; i < argv.length; i++){
    console.log(i, argv[i]);
}

function cat(path){

    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            //log error
            console.error(err);
            //quit program
            process.exit(1);
        }
        console.log(`file contents: ${data}`);
    });

    console.log("reading file");
}

function webCat(url){

    return axios.get(url)
                .then(function(resp){
                    console.log(resp.data);
                })
                .catch(function(error){
                    console.error(`Error fetching ${url}: ${error}`);
                })         
}

function decideIfFileOrUrl(arg){

    if (arg.includes('http')){
        webCat(arg);
    } else {
        cat(arg);
    }
}

decideIfFileOrUrl(argv[2]);