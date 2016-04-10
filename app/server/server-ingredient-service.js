/**
 * Created by gordan on 10.04.16..
 */

module.exports = ['serverService', 'ingredientPacker', 'messageQueue', function(Service, ingredientPacker, messageQueue){

    var service = new Service('api/ingredient/', ingredientPacker);
    service.onPutSuccess = function(response) { messageQueue.addMessages(sprintf('\'%s\' created successfully.', response.name)) };
    service.onPutError = function(error) { messageQueue.addMessages(error); };
    service.onPostSuccess = function(response){ messageQueue.addMessages(sprintf('\'%s\' updated successfully.', response.name)) };
    service.onPostError = function(error) { messageQueue.addMessages(error)}
    service.onDeleteSuccess = function(response){ messageQueue.addMessages(sprintf('Ingredient deleted successfully.', response.name)) };
    service.onDeleteError = function(error) { messageQueue.addMessages(error)};

    return service;

}];