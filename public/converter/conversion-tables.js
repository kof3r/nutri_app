/**
 * Created by ggrab on 24.2.2016..
 */

angular.module('conversionTables', [])

    .value('gramsPerUnitTable', {
        g: 1.0,
        kg: 1000.0,
        oz: 28.3495,
        lbs: 453.592
    })

    .value('calsPerUnitTable', {
        kcal: 1.0,
        kj: 0.239006
    })
