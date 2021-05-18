const fs = require("fs"); // fs = file system

function saveToFile(fileName, order) {
    // check if there's a folder named "receipts", if not - create one. if yes - do nothing
    if (!fs.existsSync("./receipts/")) {
        // create a new folder named "receipts"
        fs.mkdirSync("./receipts/");
    }
    fs.appendFileSync(fileName, order);
}


module.exports = {
    saveToFile
}