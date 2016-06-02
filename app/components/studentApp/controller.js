/**
 * Created by gordan on 13.05.16..
 */

module.exports = ['$scope', '$http', 'formFields', 'tableColumn', 'interactor', function($scope, $http, ff, TableColumn, interactor) {

    const courseUrl= 'studentApp/course';
    const studentUrl = 'studentApp/student';
    const examUrl = 'studentApp/exam';
    
    $scope.courseForm = [
        [ { name: new ff.String('Course') } ]
    ];

    $scope.courseTable = {
        id: new TableColumn('id'),
        name: new TableColumn('Course')
    };
    
    $scope.examForm = [
        [ { grade: new ff.Slider('Grade', { min: 1, max: 5 }) } ]
    ];

    $scope.examTable = {
        id: new TableColumn('id'),
        StudentId: new TableColumn('SID'),
        CourseId: new TableColumn('CID'),
        grade: new TableColumn('Grade'),
        firstName: new TableColumn('First name'),
        lastName: new TableColumn('Last name'),
        course: new TableColumn('Course')
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
        const StudentId = headItems['studentTable'].map(s => s.id);
        const CourseId = headItems['courseTable'].map(c => c.id);

        return $http({
            method: 'GET',
            url: `${examUrl}/withStudents`,
            params: {
                StudentId: StudentId,
                CourseId: CourseId
            }
        }).then(res => {
            return res.data.map(e => {
                e.firstName = e.Student.firstName;
                e.lastName = e.Student.lastName;
                e.course = e.Course.name;
                delete e.Student;
                return e;
            });
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
        
        return req(examUrl, item).then(res => {
            if(res.status === 200) {
                return res.data;
            } else {
                return Promise.reject(res.data);
            }
        });
    };

    $scope.saveStudent = function(item) {

        const errors = require('../../../bridge/validate')(item, require('../../../bridge/validation-schemes/student'));

        if(errors.length > 0) {
            interactor.alert({
                title: 'Student validation error',
                text: errors.reduce((text, error) => text += `${error}\n`, '')
            });

            return Promise.reject();
        } else {
            let req = item.id ? $http.post : $http.put;

            return req(studentUrl, item).then(res => {
                return res.data;
            }).catch(res => {
                if(res.status === 403) {
                    interactor.alert({
                        title: 'Student validation error',
                        text: res.data.message.reduce((text, error) => text += `${error}`, '')
                    });
                }
                return Promise.reject(res.data);
            });
        }
    };

    $scope.studentForm = [
        [ { firstName: new ff.String('First name') }, { middleName: new ff.String('Middle name') } ],
        [ { lastName: new ff.String('Last name') } ],
        [ { sex: new ff.Enum('Gender', ['male', 'female']) }, { birthday: new ff.Date('Birthday') } ],
        [ { country: new ff.Enum('Country', countries) }, { city: new ff.String('City') } ],
        [ { address: new ff.String('Address') } ]
    ];

    $scope.studentTable = {
        id: new TableColumn('id'),
        firstName: new TableColumn('First name'),
        lastName: new TableColumn('Last name')
    };

    function countries() {
        return $http.get('https://restcountries.eu/rest/v1/all').then(res => res.data.map(c => c.name).sort((a, b) => a.localeCompare(b)));
    }

}];