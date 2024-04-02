const Hotels =require("./Hotels");
const City=require("./City");
const Image=require("./image");
const Booking = require("./Booking");
const User= require("./User");
const Review = require("./Review");

City.hasMany(Hotels);
Hotels.belongsTo(City);

Hotels.hasMany(Image);
Image.belongsTo(Hotels);

User.hasMany(Booking);
Booking.belongsTo(User);

Hotels.hasMany(Booking);
Booking.belongsTo(Hotels);

User.hasMany(Review);
Review.belongsTo(User);

Hotels.hasMany(Review);
Review.belongsTo(Hotels);

