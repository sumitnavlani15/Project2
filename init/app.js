const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/newCollect";

main().then(() => {
    console.log("connected to Dba");
}).catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(Mongo_URL);

    await initDb();

}

const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "69e704f7eaf965cd536a3d64"}));
    await Listing.insertMany(initData.data); 
}

initDb();
