# IT313 TypeScript Foundations

## Project Description

This project is a TypeScript version of the IT313 Enrollment Eligibility Checker.

The system checks the grades of each enrollee, calculates their average, and determines whether they are PASSING or on PROBATION. It also displays the class average and the total number of passing students.

## TypeScript Concepts Used

### Interface
The `Enrollee` interface defines the structure of each student record, including the name and three grades.

### Type Alias
The `EligibilityReport` type defines the information included in the eligibility report, such as the name, average, status, and optional remarks.

### Enum
The `EnrollmentStatus` enum represents the two possible statuses: `PASSING` and `PROBATION`.

### Union Type
The `batchId` variable uses a union type, which allows it to contain either a string or a number. The `typeof` operator is used to check the type before using it.

### Generics
The `groupBy<T>` function uses a generic type so it can work with different types of data while keeping the type information.

### Async and Await
The `getEnrollees()` function returns a Promise, and `async` and `await` are used to handle the enrollee data.

### Map and Reduce
`map()` is used to create the eligibility reports, while `reduce()` is used to calculate the class average.
## How to Run

### Install TypeScript

```bash
npm install --save-dev typescript