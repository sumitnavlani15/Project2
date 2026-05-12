const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const ListingSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    description: {
        type: String,
    },
     image: {
       filename: {
            type: String,
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
        },
    },
    price:{ 
        type: Number,
    },
    location:{ 
        type: String,
    },  
    country:{ 
        type: String,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

ListingSchema.post("findOneAndDelete", async (listing) =>{
   if(listing) {
      await Review.deleteMany({_id : {$in: listing.reviews}});
   }
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;  
 // filename: {
        //     type: String,
        // },
        // url: {
        //     type: String,
        //     default: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
        // },