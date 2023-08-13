const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("Mongo connection open");
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: "64d06c6accaee02b19d1c257",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quae tempora pariatur sequi debitis id assumenda, autem voluptatum natus rerum magnam repellendus, accusantium ullam eveniet maiores doloribus odit ducimus incidunt.",
      price,
      geometry:{ type: 'Point', coordinates: [
        cities[random1000].longitude,
        cities[random1000].latitude,

     ] },
      images: [
        {
          url: 'https://res.cloudinary.com/dseqrwhcn/image/upload/v1691832011/YelpCamp/fauun3m7o14g217flgna.jpg',
          filename: "YelpCamp/fauun3m7o14g217flgna",
        },
        {
          url: "https://res.cloudinary.com/dseqrwhcn/image/upload/v1691590428/YelpCamp/u5aamnwnnui8bb4ajfwf.jpg",
          filename: "YelpCamp/u5aamnwnnui8bb4ajfwf",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
