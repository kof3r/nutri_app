/**
 * Created by gordan on 10.04.16..
 */

module.exports = function(){

    function Cache(calculate){
        this.valid = false;
        this.calculate = calculate;
    }

    Cache.prototype.invalidate = function(){
        this.valid = false;
    }

    Cache.prototype.value = function(){
        if(!this.valid){
            this._value = this.calculate();
            this.valid = true;
        }
        return this._value;
    }

    return Cache;

}