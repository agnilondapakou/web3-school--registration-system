// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract SchoolRegistrationSystem {
    address public contractOwner;

    struct Student {
        uint id;
        string name;
        bool isDeleted;
    }

    mapping(uint => Student) public students;
    mapping(address => uint[]) public admin;
    uint studentCount;

    modifier onlyAdmin() {
        require(msg.sender == contractOwner, "Only contract admin can perform this action.");
        _;
    }

    constructor() {
        contractOwner = msg.sender;
    }

    // function to register new student
    function registerStudent(string memory _name) external onlyAdmin(){
        studentCount++;
        students[studentCount] = Student(studentCount, _name, false);
        admin[msg.sender].push(studentCount);
    }

    // function to delete student
    function removeStudent(uint studentId) external onlyAdmin(){
        students[studentId].isDeleted = true;
    }

    // function to get students
    function getStudent(uint studentId) external view returns (string memory) {
        require(students[studentId].isDeleted, "Student not registered");
        Student memory student = students[studentId];
        return (student.name);
    }
}
