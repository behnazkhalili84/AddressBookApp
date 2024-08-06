// models/Teacher.js
import Person from './Person';

export default class Teacher extends Person {
  constructor(name, address, phone, department, program, image) {
    super(name, address, phone, department, program, image);
  }
}
