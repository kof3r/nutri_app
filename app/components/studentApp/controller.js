/**
 * Created by gordan on 13.05.16..
 */

module.exports = ['$scope', '$http', 'formFields', 'tableColumn', function($scope, $http, ff, TableColumn) {

    $scope.studentForm = {
        firstName: new ff.TextInput('First name'),
        lastName: new ff.TextInput('Last name')
    };

    $scope.saveStudent = function(student) {
        return $http.put('studentApp/student', student).then(res => {
            return res.data;
        });
    };

    $scope.studentTable = {
        id: new TableColumn('id'),
        firstName: new TableColumn('Frist name'),
        lastName: new TableColumn('Last name')
    };

    $scope.getStudents = function(query) {
        query = sequelizeQuery(query);
        return $http.get('studentApp/student', query).then(res => {
            return res.data;
        });
    };

    function sequelizeQuery(query) {
        const sequelQuery = {};
        for(let foreignKey in query) {
            sequelQuery[foreignKey] = { $in: query[foreignKey] };
        }
        return sequelQuery;
    }

}];