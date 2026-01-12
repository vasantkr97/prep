//Type Assertion
//as syntax
// let value: unknown = "goo";
// let len: number = (value as string).length

//<> syntax

// let value: unknown = "goo";
// let len: number = (<string>value).length



//Tuple destructuring in TS

// let employeRecord: [string, number] = ["vasanth", 5000];
// let [emp_name, emp_salary] = employeRecord;

// let [emp_name, emp_salary]: [string, number] = ["vasanth", 5000]



//Tuple Optional Types
// let values: [ string, number, boolean? ] = ["Foo", 15];



//TYPE Aliase

// type alphanumeric = string | number;
// let value: alphanumeric = ""
// value = 10


//Intersection Types

// interface Employee {
//     work: () => string;
// }

// interface Manager {
//     manager: () => string;
// }

// type supervisor = Employee & Manager;
// let vasanth: supervisor ;


//Union Types

// let value: string | number = "goo";
// value = 10;

