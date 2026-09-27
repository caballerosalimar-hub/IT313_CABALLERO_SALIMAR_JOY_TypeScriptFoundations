import getStatus, {
  computeAverage,
  EnrollmentStatus,
} from "./gradeUtils.js";

interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

type EligibilityReport = {
  name: string;
  average: number;
  status: EnrollmentStatus;
  remarks?: string;
};

const enrollees: Enrollee[] = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

let batchId: string | number =
  Math.random() > 0.5 ? 313 : "B313";

if (typeof batchId === "number") {
  console.log(`Processing batch number: ${batchId}`);
} else {
  console.log(`Processing batch: ${batchId.toUpperCase()}`);
}

function getEnrollees(): Promise<Enrollee[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(enrollees);
    }, 500);
  });
}

function groupBy<T>(
  items: T[],
  keyFn: (item: T) => string
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = keyFn(item);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);

    return groups;
  }, {});
}

async function generateReport(): Promise<void> {
  try {
    const data = await getEnrollees();

    const reports: EligibilityReport[] = data.map(
      ({ name, prelim, midterm, final }) => {
        const average = computeAverage(prelim, midterm, final);
        const status = getStatus(average);

        const report: EligibilityReport = {
          name,
          average,
          status,
        };

        if (status === EnrollmentStatus.Probation) {
          report.remarks = "Needs consultation";
        }

        return report;
      }
    );

    const groupedReports = groupBy(
      reports,
      (report) => report.status
    );

    const total = reports.reduce(
      (sum, report) => sum + report.average,
      0
    );

    const classAverage = total / reports.length;

    const passingCount =
      groupedReports[EnrollmentStatus.Passing]?.length ?? 0;

    let output =
      "=== IT313 Enrollment Eligibility Report (TypeScript) ===\n";

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
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("Unknown error occurred.");
    }
  }
}

generateReport();