/**
 * Created by gordan on 08.05.16..
 */

exports.energy = [function() {
    return function(value){
        return `${value.toFixed(0)} kcal`;
    }
}];

exports.mass = [function(){
    return function(value){
        return `${value.toFixed(1)} g`;
    }
}];

exports.volume = [function(){
    return function(value){
        return `${value.toFixed(1)} ml`;
    }
}];

exports.quantity = [function(){
    return function(value){
        return value.toFixed(0);
    }
}];