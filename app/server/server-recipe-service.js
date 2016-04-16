/**
 * Created by gordan on 10.04.16..
 */

module.exports = ['serverService', 'recipePacker', 'messageQueue', function(Service, recipePacker, messageQueue){

    var service = new Service('api/recipe/', recipePacker);
    service.onGetSuccess = function(response){ messageQueue.addMessages(angular.isArray(response) ? response.map(function(recipe) { return sprintf('\'%s\' loaded.', recipe.name); }) : sprintf('\'%s\' loaded.', response.name)) };
    service.onGetError = function(error) { messageQueue.addMessages(error); };
    service.onPutSuccess = function(response) { messageQueue.addMessages(sprintf('\'%s\' created successfully.', response.name)); };
    service.onPutError = function(error) { messageQueue.addMessages(error); };
    service.onPostSuccess = function(response){ messageQueue.addMessages(sprintf('\'%s\' updated successfully.', response.name)); };
    service.onPostError = function(error) { messageQueue.addMessages(error)};
    service.onDeleteSuccess = function(response){ messageQueue.addMessages(sprintf('Recipe deleted successfully.', response.name)); };
    service.onDeleteError = function(error) { messageQueue.addMessages(error)};

    return service;

}];