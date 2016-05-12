/**
 * Created by gordan on 11-May-16.
 */

module.exports = ['$timeout', '$q', function($timeout, $q) {
    return {

        // TODO: Dodaj unregister - kad rikne komponenta donja

        restrict: 'A',
        scope: {},
        controller: function() {

            const subscribers = new Map();
            const controllers = new Map();
            
            this.register = function(id, controller, heads) {
                if(controllers.get(id)) {
                    throw new Error('dfLinker#register: Registered component id\'s must be unique!');
                }
                controllers.set(id, controller);
                if(heads) {
                    heads.forEach((head) => {
                        let subs = subscribers.get(head);
                        if(!subs) {
                            subs = [];
                            subscribers.set(head, subs);
                        }
                        subs.push(id);
                    });
                }
            };

            //  called by a table-view when the selected items change
            this.onSelectedItemsChanged = function(id, items) {
                items = items.slice(0);
                const subs = subscribers.get(id);
                if(subs){
                    subs.forEach((sub) => {
                        controllers.get(sub).headItemsChanged(id, items);
                    });
                }
            };

            // called by a table-view when an item is deleted
            this.onItemsDeleted = function(id) {
                const subs = subscribers.get(id);
                if(subs){
                    subscribers.get(id).forEach((sub) => {
                        sub.loadItems();
                    });
                }
            };

            this.onItemSaved = function onItemSaved(head) {
                const ctrl = controllers.get(head);
                if(!ctrl) {
                    throw new Error('Specified controller was not found.');
                }
                ctrl.loadItems();
            }
            
            
        }

    };
}];

