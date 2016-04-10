/**
 * Created by ggrab on 21.2.2016..
 */

angular.module('converter', ['settings', 'conversionTables'])

    .factory('converterConstructor', function(){
        return function (basePerUnitTable, activeUnitSetting){

            this.to = function(value){
                return value / basePerUnitTable[activeUnitSetting.value()];
            }

            this.from = function(value){
                return value * basePerUnitTable[activeUnitSetting.value()];
            }

        }
    })

    .factory('converterMass', ['converterConstructor', 'gramsPerUnitTable', 'settingsUnitsMass', function(Converter, gramsPerUnitTable, settings){
        return new Converter(gramsPerUnitTable, settings);
    }])

    .factory('converterEnergy', ['converterConstructor', 'calsPerUnitTable', 'settingsUnitsEnergy', function(Converter, calsPerUnitTable, settings){
        return new Converter(calsPerUnitTable, settings);
    }]);

