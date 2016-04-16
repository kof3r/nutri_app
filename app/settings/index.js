/**
 * Created by ggrab on 21.2.2016..
 */

const name = 'settings';

const settings = require('angular').module(name, []);

settings.factory('settingConstructor', function () {
    function Setting(defaultValue, possibleValues){
        this._value = defaultValue;
        this.values = possibleValues;
    }

    Setting.prototype.value = function(value){
        if(arguments.length === 0){
            return this._value;
        }
        this._value = value;
    };

    return Setting;
});

settings.factory('settingsUnitsMass', ['settingConstructor', function (Setting) {
    return new Setting('g');
}]);

settings.factory('settingsUnitsEnergy', ['settingConstructor', function(Setting){
    return new Setting('kcal');
}]);

settings.factory('settingsUnitsVolume', ['settingConstructor', function(Setting){
    return new Setting('ml');
}]);

module.exports = name;