const fs = require("fs");
const axios = require("axios");
const argv = process.argv;

for (let i = 0; i < argv.length; i++){
    console.log(i, argv[i]);
}

function cat(path, out){
    
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            //log error
            console.error(err);
            //quit program
            process.exit(1);
        }
        else if (out) {
            writeToFile(out, data);
        }
        console.log(`file contents: ${data}`);
    });

    console.log("reading file");
    
}

function webCat(url, out){

    return axios.get(url)
                .then(function(resp){
                    console.log(resp.data);
                    if (out){
                        writeToFile(out, resp.data);
                    }
                })
                .catch(function(error){
                    console.error(`Error fetching ${url}: ${error}`);
                })         
}

function decideIfFileOrUrl(arg){
    
    if (arg.includes('http')){
        webCat(arg);
    } 
    else if (arg === '--out') {
        if (argv[4].includes('http')){
            webCat(argv[4], argv[3]);
        }
        else{
            cat(argv[4], argv[3]);
        }
    } 
    else {
        cat(arg);
    }
}

function writeToFile(path, data){
    fs.writeFile(path, data, 'utf8', function(err){
        if (err){
            console.error(err);
            process.exit(1);
        }
        console.log('Successfully wrote to file!');
    })
    console.log("writing file...");
}

decideIfFileOrUrl(argv[2]);


