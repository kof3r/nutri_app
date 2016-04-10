/**
 * Created by ggrab on 25.2.2016..
 */

module.exports = function(){

        function Base(){ }

        Base.prototype.isNew = function(){
            return typeof this.id === 'undefined';
        }

        Base.prototype.isDirty = function(){
            return !this.isNew() && this.dirty;
        };

        return Base;

}