const catchError = require('../utils/catchError');
const Booking = require('../models/Booking');
const User=require('../models/User');
const Hotels = require('../models/Hotels');
const Image = require('../models/image');
const City = require('../models/City');

const getAll = catchError(async(req, res) => {
    const userId=req.user.id;
        
    const results = await Booking.findAll({
        include:[{
            model:User,
            attributes:{exclude:['password']}
            },{model:Hotels,
            include:[
                Image,City
            ]}],
            where:{
                userId:userId
            }
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {checkIn,checkOut,hotelId}=req.body;
    const userId=req.user.id;
    console.log(userId);
    
    
    const result = await Booking.create({
        checkIn,checkOut,hotelId,userId:userId
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Booking.findByPk(id,{include:[User]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Booking.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const {checkIn,checkOut}=req.body;
    const result = await Booking.update(
        {checkIn,checkOut},
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}