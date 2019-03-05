const fs = require("fs");
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

cat(argv[2])

