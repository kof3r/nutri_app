/**
 * Created by gordan on 13.05.16..
 */

const Sequelize = require('sequelize');

const studentDb = new Sequelize('postgres://studentapp:studentap@localhost:5432/students');

const Student = studentDb.define('Student', require('./student'), {});

const Course = studentDb.define('Course', require('./course'), {});

const Exam = studentDb.define('Exam', require('./exam'), {});

Student.hasMany(Exam);

Course.hasMany(Exam);

Exam.belongsTo(Course);

Exam.belongsTo(Student);

studentDb.sync({ force: true });

module.exports = studentDb;