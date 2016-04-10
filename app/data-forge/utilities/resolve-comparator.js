/**
 * Created by gordan on 10.04.16..
 */

module.exports = function(item, p, reverse){

    if(angular.isFunction(item[p])){
        return reverse ? reverseFuncarator : funcarator;
    } else {
        return reverse ? reverseComparator : comparator;
    }

    function funcarator(a, b){
        a = a[p](), b = b[p]();
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    }

    function reverseFuncarator(a, b){
        a = a[p](), b = b[p]();
        if(a < b) return 1;
        if(a > b) return -1;
        return 0;
    }

    function comparator(a, b){
        a = a[p], b = b[p];
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    }

    function reverseComparator(a, b){
        a = a[p], b = b[p];
        if(a < b) return 1;
        if(a > b) return -1;
        return 0;
    }
}