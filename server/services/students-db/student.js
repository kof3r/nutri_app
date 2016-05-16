/**
 * Created by gordan on 13.05.16..
 */

const Seq = require('sequelize');

module.exports = {

    firstName: Seq.STRING,
    lastName: Seq.STRING,
    middleName: Seq.STRING,
    birthday: Seq.DATE,
    sex: Seq.ENUM('male', 'female'),
    address: Seq.STRING,
    city: Seq.STRING,
    country: Seq.STRING

};