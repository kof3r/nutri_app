/**
 * Created by ggrab on 23.2.2016..
 */

var fs = require('fs');
var path = require('path');
var models = Object.create(null);
var relations = Object.create(null);

function Singleton(){

    var Sequelize = require('sequelize');
    var sequelize = null;
    var modelsPath = '';

    this.setup = function(path){
        modelsPath = path;

        var config = require('./config/db');
        config.options.define = require('./config/model');

        sequelize = new Sequelize(config.database, config.username, config.password, config.options);

        return init();
    };

    this.model = function(name){
        return models[name];
    };

    this.Seq = function(){
        return Sequelize;
    };

    function init(){
        fs.readdirSync(modelsPath).forEach(function(modelFileName){
            var definition = require(path.join(modelsPath, modelFileName));
            var options = definition.options || {};
            var modelName = modelFileName.replace(/\.js$/i, '');
            models[modelName] = sequelize.define(modelName, definition.attributes, options);
            if('relations' in definition){
                relations[modelName] = definition.relations;
            }
        });

        for(var modelName in relations){
            for(var relationTypeName in relations[modelName]){
                relations[modelName][relationTypeName].forEach(function(relatedTableName){
                    models[modelName][relationTypeName](models[relatedTableName]);
                });
            }
        }
        return sequelize.sync();
    }
}

Singleton.instance = null;

Singleton.getInstance = function(){
    if(this.instance === null){
        this.instance = new Singleton();
    }
    return this.instance;
};

module.exports = Singleton.getInstance();