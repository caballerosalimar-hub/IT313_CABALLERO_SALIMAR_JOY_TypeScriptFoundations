"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const gradeUtils_js_1 = __importStar(require("./gradeUtils.js"));
const enrollees = [
    { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
    { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
    { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
    { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
    { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];
let batchId = Math.random() > 0.5 ? 313 : "B313";
if (typeof batchId === "number") {
    console.log(`Processing batch number: ${batchId}`);
}
else {
    console.log(`Processing batch: ${batchId.toUpperCase()}`);
}
function getEnrollees() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(enrollees);
        }, 500);
    });
}
function groupBy(items, keyFn) {
    return items.reduce((groups, item) => {
        const key = keyFn(item);
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {});
}
async function generateReport() {
    try {
        const data = await getEnrollees();
        const reports = data.map(({ name, prelim, midterm, final }) => {
            const average = (0, gradeUtils_js_1.computeAverage)(prelim, midterm, final);
            const status = (0, gradeUtils_js_1.default)(average);
            const report = {
                name,
                average,
                status,
            };
            if (status === gradeUtils_js_1.EnrollmentStatus.Probation) {
                report.remarks = "Needs consultation";
            }
            return report;
        });
        const groupedReports = groupBy(reports, (report) => report.status);
        const total = reports.reduce((sum, report) => sum + report.average, 0);
        const classAverage = total / reports.length;
        const passingCount = groupedReports[gradeUtils_js_1.EnrollmentStatus.Passing]?.length ?? 0;
        let output = "=== IT313 Enrollment Eligibility Report (TypeScript) ===\n";
        reports.forEach(({ name, average, status, remarks }) => {
            output += `${name} - Average: ${average.toFixed(2)} - ${status}`;
            if (remarks) {
                output += ` - ${remarks}`;
            }
            output += "\n";
        });
        output += `Class Average: ${classAverage.toFixed(2)}\n`;
        output += `Passing: ${passingCount} / ${reports.length}`;
        console.log(output);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        }
        else {
            console.error("Unknown error occurred.");
        }
    }
}
generateReport();
