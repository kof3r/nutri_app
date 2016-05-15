/**
 * Created by gordan on 13.05.16..
 */

module.exports = ['$scope', '$http', 'formFields', 'tableColumn', function($scope, $http, ff, TableColumn) {

    const courseUrl= 'studentApp/course';
    const studentUrl = 'studentApp/student';
    const examUrl = 'studentApp/exam';
    
    $scope.courseForm = {
        name: new ff.TextInput('Course')
    };

    $scope.courseTable = {
        id: new TableColumn('id'),
        name: new TableColumn('Course')
    };
    
    $scope.examForm = {
        grade: new ff.NumberInput('Grade')
    };

    $scope.examTable = {
        id: new TableColumn('id'),
        StudentId: new TableColumn('StudentId'),
        CourseId: new TableColumn('CourseId'),
        grade: new TableColumn('Grade'),
        firstName: new TableColumn('First name'),
        lastName: new TableColumn('Last name')
    };

    

    $scope.deleteCourse = function(student) {
        return $http.delete(courseUrl, { params: { id: student.id } }).then(res => {
            if(res.status === 200) {
                return res.data;
            } else {
                return Promise.reject(res.data);
            }
        })
    };

    $scope.deleteExam = function(exam) {
        return $http.delete(examUrl, { params: { id: exam.id } }).then(res => {
            if(res.status === 200) {
                return res.data;
            } else {
                return Promise.reject(res.data);
            }
        })
    };

    $scope.deleteStudent = function(student) {
        return $http.delete(studentUrl, { params: { id: student.id } }).then(res => {
            if(res.status === 200) {
                return res.data;
            } else {
                return Promise.reject(res.data);
            }
        })
    };

    $scope.getCourses = function() {
        return $http.get(courseUrl).then(res => {
            return res.data;
        });
    };

    $scope.getExams = function(headItems) {
        console.log(headItems);
        const query = { where: {} };
        if(headItems['studentTable'].length){
            query.where.StudentId = { $in: headItems['studentTable'].map(s => s.id) };
        }
        if(headItems['courseTable'].length) {
            query.where.CourseId = { $in: headItems['courseTable'].map(c => c.id) };
        }
        query.include = [{ model: 'Student' }];
        return $http({
            method: 'GET',
            url: examUrl,
            params: {
                query: query
            }
        }).then(res => {
            return res.data;
        });
    };

    $scope.getStudents = function() {
        return $http.get(studentUrl).then(res => {
            return res.data;
        });
    };

    $scope.saveCourse = function(item) {
        let req = item.id ? $http.post : $http.put;

        return req(courseUrl, item).then(res => {
            if(res.status === 200) {
                return res.data;
            } else {
                return Promise.reject(res.data);
            }
        });
    };

    $scope.saveExam = function(item) {
        let req = item.id ? $http.post : $http.put;
        console.log('sending to server', item);

        return req(examUrl, item).then(res => {
            if(res.status === 200) {
                return res.data;
            } else {
                return Promise.reject(res.data);
            }
        });
    };

    $scope.saveStudent = function(item) {
        let req = item.id ? $http.post : $http.put;

        return req(studentUrl, item).then(res => {
            if(res.status === 200) {
                return res.data;
            } else {
                return Promise.reject(res.data);
            }
        });
    };

    $scope.studentForm = {
        firstName: new ff.TextInput('First name'),
        lastName: new ff.TextInput('Last name')
    };

    $scope.studentTable = {
        id: new TableColumn('id'),
        firstName: new TableColumn('Frist name'),
        lastName: new TableColumn('Last name')
    };
    
    


    function sequelizeQuery(query) {
        const sequelQuery = {};
        for(let foreignKey in query) {
            sequelQuery[foreignKey] = { $in: query[foreignKey] };
        }
        return sequelQuery;
    }

}];