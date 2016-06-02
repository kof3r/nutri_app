/**
 * Created by gordan on 02.06.16..
 */

module.exports = {
    fields: {
        name: [
            [ (value) => value && value.length > 0, 'Ingredient name is required.' ],
            [ (value) => /^[a-zšđčćžA-ŽŠĐČĆŽ '-]*$/.test(value), 'Ingredient name can only contain alphanumerics.' ]
        ],
        carbs: [
            [ (value) => !isNaN(parseFloat(value)), 'The amount of carbs must be a decimal value.' ],
            [ (value) => isNaN(parseFloat(value)) || parseFloat(value) >= 0, 'The amount of carbs must be a non-negative value.' ]
        ],
        fats: [
            [ (value) => !isNaN(parseFloat(value)), 'The amount of fats must be a decimal value.' ],
            [ (value) => isNaN(parseFloat(value)) || parseFloat(value) >= 0, 'The amount of fats must be a non-negative value.' ]
        ],
        protein: [
            [ (value) => !isNaN(parseFloat(value)), 'The amount of protein must be a decimal value.' ],
            [ (value) => isNaN(parseFloat(value)) || parseFloat(value) >= 0, 'The amount of protein must be a non-negative value.' ]
        ]
    },
    constraints: {
        nutrientSum: [
            (object) => {
                const carbs = parseFloat(object.carbs);
                const fats = parseFloat(object.fats);
                const protein = parseFloat(object.protein);
                const sum = carbs + fats + protein;
                return isNaN(carbs) || isNaN(fats) || isNaN(protein) || carbs < 0 || fats < 0 || protein < 0 || ( sum >= 0 && sum <= 100 );
            },
            'The sum of nutrients must not exceed 100.'
        ]
    }
};