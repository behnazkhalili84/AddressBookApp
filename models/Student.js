// models/Student.js
import Person from './Person';

export default class Student extends Person {
  constructor(name, address, phone, department, program, image) {
    super(name, address, phone, department, program, image);
  }
}
