const Listing = require("../models/listing.js");


module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("index.ejs", {allListing});
}; 

module.exports.renderNewForm = (req, res) => {
    res.render("new.ejs");
};

module.exports.showListing = async(req, res) => {
    let {id} = req.params;
    const listings = await Listing.findById(id).populate({path: "reviews", populate: {
        path: "author",
    },
    })
     .populate("owner");
    if(!listings){
       req.flash("error", "listing you requested for does not exist");
       res.redirect("/listings");
    }
    console.log(listings);
    res.render("show.ejs", {listings});
}
module.exports.createListing = async (req, res, next) => {
        let url = req.file.path;
        let filename = req.file.filename;
        console.log(url, "..",filename);
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url, filename};
        await newListing.save();
        req.flash("success", "New listing created");
        res.redirect("/listings");
        // let {title, description, image, price, country, location}  = req.body;
  };

module.exports.EditListing = async (req, res) => {
    let {id} = req.params;
    const listings = await Listing.findById(id);
    if(!listings){
       req.flash("error", "listing you requested for does not exist");
       res.redirect("/listings");
    }
    res.render("edit.ejs", {listings});
}; 

module.exports.UpdateListing = async (req, res) => {
    let {id} = req.params;
    // let listing = await Listing.findById(id);
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing}, {new: true});
   
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }

    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
    // res.redirect(`/listings/_.{id}`);
};

module.exports.DeleteListing = async (req, res) => {
   let{id} = req.params;
   let deleteListing = await Listing.findByIdAndDelete(id);
   req.flash("success", "Listing deleted successfully");
   res.redirect("/listings");
};
