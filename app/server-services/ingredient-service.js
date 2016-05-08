/**
 * Created by gordan on 08.05.16..
 */

module.exports = ['$http', 'Ingredient', function($http, Ingredient) {

    const url = 'api/ingredient';

    function get(id) {
        return $http.get(`${url}`, { params: { id: id } }).then((res) => {
            return new Ingredient(res.data.response);
        });
    }

    function put(ingredient) {
        return $http.put(url, ingredient).then((res) => new Ingredient(res.data.response));
    }

    function post(ingredient) {
        return $http.post(url, ingredient).then((res) => new Ingredient(res.data.response));
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