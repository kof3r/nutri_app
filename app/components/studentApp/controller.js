/**
 * Created by gordan on 13.05.16..
 */

module.exports = ['$scope', '$http', 'formFields', 'tableColumn', function($scope, $http, ff, TableColumn) {

    const courseUrl= 'studentApp/course';
    const studentUrl = 'studentApp/student';
    const examUrl = 'studentApp/exam';
    
    $scope.courseForm = [
        [ { name: new ff.TextInput('Course') } ],
        [  ]
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
        let req = item.id ? $http.post : $http.put;

        return req(studentUrl, item).then(res => {
            if(res.status === 200) {
                return res.data;
            } else {
                return Promise.reject(res.data);
            }
        });
    };

    $scope.studentForm = [
        [ { firstName: new ff.TextInput('First name') }, { middleName: new ff.TextInput('Middle name') } ],
        [ { lastName: new ff.TextInput('Last name') } ],
        [ { birthday: new ff.Date('Birthday') }, { sex: new ff.Enum('Gender', ['male', 'female']) } ],
        [ { country: new ff.Enum('Country', countries) }, { city: new ff.TextInput('City') } ],
        [ { address: new ff.TextInput('Address') } ]
    ];

    $scope.studentTable = {
        id: new TableColumn('id'),
        firstName: new TableColumn('First name'),
        lastName: new TableColumn('Last name')
    };

    function countries() {
        return $http.get('https://restcountries.eu/rest/v1/all').then(countries => countries.map(c => c.name));
    }

}];