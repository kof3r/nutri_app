/**
 * Created by gordan on 06.05.16..
 */

module.exports = ['$http', 'Recipe', function($http, Recipe) {
    
    const url = 'api/recipe';
    
    function get(query) {
        return $http.get(url, { params: { query: query } }).then((res) => {
            return res.data.response.map((recipe) => new Recipe(recipe));
        });
    }

    function put(recipe) {
        return $http.put(url, recipe).then((res) => new Recipe(res.data.response));
    }
    
    function post(recipe) {
        return $http.post(url, recipe).then((res) => new Recipe(res.data.response));
    }
    
    function _delete(id) {
        return $http.delete(`${url}/${id}`).then((res) => res.data.response);
    }
    
    return {
        get: get,
        put: put,
        post: post,
        delete: _delete
    }
    
}];