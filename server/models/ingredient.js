/**
 * Created by ggrab on 23.2.2016..
 */

var orm = require('../orm');
var Seq = orm.Seq();

module.exports = {
    attributes:{

        id:{
            type: Seq.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name:{
            type: Seq.STRING,
            allowNull: false,
        },

        carbs:{
            type: Seq.FLOAT,
            defaultValue: 0
        },

        fats:{
            type: Seq.FLOAT,
            defaultValue: 0
        },

        protein:{
            type: Seq.FLOAT,
            defaultValue: 0
        },

        amount:{
            type: Seq.FLOAT,
            defaultValue: 0
        },

        measure:{
            type: Seq.ENUM(['mass', 'volume', 'quantity']),
            defaultValue: 'mass'
        }

    },

    relations:{
        belongsTo:['recipe']
    },

    options:{
        timestamps: false,
        paranoid: false
    }
}