/**
 * Created by gordan on 17.05.16..
 */

const Seq = require('sequelize');

module.exports = {

    amount: Seq.FLOAT,
    measure: Seq.ENUM('mass', 'volume', 'quantity')

};