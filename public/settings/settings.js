/**
 * Created by ggrab on 21.2.2016..
 */

angular.module('settings', ['conversionTables'])

    .factory('settingConstructor', function () {
        function Setting(defaultValue, possibleValues){
            this._value = defaultValue;
            this.values = possibleValues;
        }

        Setting.prototype.value = function(value){
            if(arguments.length === 0){
                return this._value;
            }
            this._value = value;
        }

        return Setting;
    })

    .factory('settingsUnitsMass', ['settingConstructor', 'gramsPerUnitTable', function (Setting, massTable) {
        return new Setting('g', Object.keys(massTable));
    }])

    .factory('settingsUnitsEnergy', ['settingConstructor', 'calsPerUnitTable', function(Setting, calorieTable){
        return new Setting('kcal', Object.keys(calorieTable));
    }]);