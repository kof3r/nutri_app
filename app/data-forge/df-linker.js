/**
 * Created by gordan on 11-May-16.
 */

module.exports = [function() {
    return {

        // TODO: Dodaj unregister - kad rikne komponenta donja

        restrict: 'A',
        scope: {},
        controller: function() {

            const subscribers = new Map();
            const controllers = new Map();
            
            this.register = function(id, controller, head) {
                if(controllers.get(id)) {
                    throw new Error('dfLinker#register: Registered component id\'s must be unique!');
                }
                controllers.set(id, controller);
                if(head) {
                    let subs = subscribers.get(head);
                    if(!subs) {
                        subs = [];
                        subscribers.set(head, subs);
                    }
                    subs.push(id);
                }
            };

            //  called by a table-view when the selected items change
            this.onSelectedItemsChanged = function(id, items) {
                items = items.slice(0);
                subscribers.get(id).forEach((sub) => {
                    controllers.get(sub).headItemsChanged(items);
                });
            };

            // called by a table-view when an item is deleted
            this.onItemDeleted = function(id, item) {
                subscribers.get(id).forEach((sub) => {
                    sub.headItemDeleted(id, item);
                });
            };
            
            
        }

    };
}];

