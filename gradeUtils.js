"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentStatus = void 0;
exports.computeAverage = computeAverage;
exports.default = getStatus;
var EnrollmentStatus;
(function (EnrollmentStatus) {
    EnrollmentStatus["Passing"] = "PASSING";
    EnrollmentStatus["Probation"] = "PROBATION";
})(EnrollmentStatus || (exports.EnrollmentStatus = EnrollmentStatus = {}));
function computeAverage(prelim, midterm, final) {
    return (prelim + midterm + final) / 3;
}
function getStatus(average) {
    if (average >= 75) {
        return EnrollmentStatus.Passing;
    }
    return EnrollmentStatus.Probation;
}
