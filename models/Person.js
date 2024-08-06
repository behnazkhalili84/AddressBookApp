// models/Person.js

export class Person {
  constructor(name, address, phone) {
    this.name = name;
    this.address = address;
    this.phone = phone;
  }
}

export class Teacher extends Person {
  constructor(name, address, phone, department) {
    super(name, address, phone);
    this.department = department;
  }
}

export class Student extends Person {
  constructor(name, address, phone, program) {
    super(name, address, phone);
    this.program = program;
  }
}
