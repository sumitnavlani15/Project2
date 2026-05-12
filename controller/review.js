const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req, res) => {
//    console.log(req.params.id);
   let listing = await Listing.findById(req.params.id);
   let newReview = new Review(req.body.reviews);
   newReview.author = req.user._id;
   listing.reviews.push(newReview);
   console.log(newReview);

   await newReview.save();
   await listing.save();
   req.flash("success", "New review created");
   res.redirect(`/listings/${listing._id}`);
   console.log("review created");
};

module.exports.EditReview = async(req, res) => {
     let {id, reviewId} = req.params;

     await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}});
     await Review.findByIdAndDelete(reviewId);
    
     req.flash("success", "Review deleted");
     res.redirect("/listings");
};