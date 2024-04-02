const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Image = sequelize.define('image', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{timestamps:false,
    // si le coloco eso no me crea los campos del tiempo
});

module.exports = Image;