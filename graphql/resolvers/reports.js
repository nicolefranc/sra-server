const Report = require("../../models/Report");
const ReportTemplate = require("../../models/ReportTemplate");

const pdf = require("html-pdf");
const fs = require("fs");

const pdfTemplate = require("../../documents");
const { sendEmail, sendPDFEmail } = require("../../emails/email");
const checkAuth = require("../../util/check-auth");
const Tenant = require("../../models/Tenant");
const Auditor = require("../../models/Auditor");
const { AuthenticationError } = require("apollo-server-errors");
const upload = require("./upload");

var options = {
    format: "A4",
    border: {
        top: "30px", // default is 0, units: mm, cm, in, px
        bottom: "30px",
    },
};

module.exports = {
    Query: {
        async getReportTemplate(_, { type }) {
            try {
                const reportTemplate = await ReportTemplate.findOne({
                    type: type,
                });
                if (reportTemplate) {
                    return reportTemplate;
                } else {
                    throw new Error("Report template not found.");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async getAllReportTemplates() {
            try {
                const templates = await ReportTemplate.find();
                if (templates) {
                    return templates;
                } else {
                    throw new Error("Report templates not found.");
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        // Add getReportsByTenant and getReportById
        async getAllReportsByTenant(_, { tenantId }) {
            try {
                const reports = await Report.find({ tenantId })
                    .populate("auditorId")
                    .populate("tenantId")
                    .sort({ auditDate: "desc" });
                console.log(reports.tenantId);
                if (reports) {
                    return reports;
                } else {
                    throw new Error("Reports not found.");
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async getAllReportsByAuditor(_, { auditorId }) {
            try {
                const reports = await Report.find({ auditorId: auditorId })
                    .populate("tenantId")
                    .populate("auditorId")
                    .sort({ auditDate: "desc" });
                if (reports) {
                    return reports;
                } else {
                    throw new Error("Reports not found.");
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async getReportById(_, { reportId }) {
            try {
                const report = await Report.findById(reportId)
                    .populate("tenantId")
                    .populate("auditorId");
                if (report) return report;
                else throw new Error("Report not found.");
            } catch (err) {
                throw new Error(err);
            }
        },

        async getReportByAuditorAndStatus(_, { auditorId, status }) {
            try {
                console.log(status);
                const report = await Report.find({ auditorId, status })
                    .populate("auditorId")
                    .populate("tenantId")
                    .sort({ auditDate: "desc" });
                if (report) return report;
                else throw new Error("Report not found.");
            } catch (err) {
                throw new Error(err);
            }
        },

        async getReportByTenantAndStatus(_, { tenantId, status }) {
            try {
                console.log(status);
                const report = await Report.find({ tenantId, status })
                    .populate("tenantId")
                    .populate("auditorId")
                    .sort({ auditDate: "desc" });
                if (report) return report;
                else throw new Error("Report not found.");
            } catch (err) {
                throw new Error(err);
            }
        },

        async getReportPDFById(_, { reportId }) {
            try {
                const report = await Report.findById(reportId);
                if (report) {
                    // pdf.create(pdfTemplate(report), {}).toFile(
                    //     "result.pdf",
                    //     (err) => {
                    //         if (err) {
                    //             throw new Error(err);
                    //         }
                    //         console.log("pdf successfully created");
                    //     }
                    // );
                    const stream = fs.createReadStream(
                        `${__dirname}/../../result.pdf`
                    );
                    return;
                } else throw new Error("Report not found.");
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    Mutation: {
        async createReportTemplate(_, { body }) {
            console.log(body);

            const newTemplate = new ReportTemplate({
                ...body,
            });

            try {
                const template = await newTemplate.save();

                if (template) {
                    return template;
                } else {
                    throw new Error("Add template unsuccessful.");
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async createReport(_, { body }, context) {
            const user = checkAuth(context);

            try {
                const tenant = await Tenant.findById(body.tenantId);
                const isAuthorized = user.institutions.includes(
                    tenant.institution
                );
                if (!isAuthorized)
                    throw new AuthenticationError(
                        "You are not authorized to audit this tenant"
                    );
            } catch (err) {
                console.log(err);
                throw new Error(err);
            }

            const report = new Report({ auditorId: user.id, ...body });

            //to update tenant performance: 1. get the number of entries, 2. recompute average 3. store back
            const tenant2 = await Tenant.findById(body.tenantId);
            if (!tenant2) {
                console.log("can't find tenant");
            }
            tenant2.performance = computeNewPerfomance(tenant2, report);

            
            try {
                const savedTenant = await tenant2.save();
                if (!savedTenant){
                    console.log("can't update tenant performance");
                }
            } catch (err){
                throw new Error(err);
            }

            try {
                const savedReport = await report.save();
                if (savedReport) return savedReport;
                else throw new Error("Creation of report unsuccessful.");
            } catch (err) {
                throw new Error(err);
            }
        },

        async proposeExtension(_, { reportId, date, remarks }, context) {
            const user = checkAuth(context);

            const report = await Report.findOne({ _id: reportId });

            if (!report) {
                throw new Error("can't find report");
            }

            report.extension.proposed.date = date;
            report.extension.proposed.remarks = remarks;
            report.extension.status = "Pending Approval";

            try {
                const savedReport = await report.save();
                if (savedReport) return savedReport;
                else throw new Error("Creation of report unsuccessful.");
            } catch (err) {
                throw new Error(err);
            }
        },

        async createRectification(_, { id, images }, context) {
            const update = { status: 'rectified', images };
            console.log('New rectification');
            console.log(id);
            console.log(images);

            try {
                let report = await Report.findByIdAndUpdate(id, update, { new: true });
                console.log('Report');
                console.log(report);

                if (report) return report;
                else throw new Error('Rectification failed to save.');
            } catch (err) {
                throw new Error(err);
            }
        },

        async approveRectification(_, { id, status}, context) {
            try {
                let report = await Report.findByIdAndUpdate(id, { status }, { new: true });

                if (report) return report;
                else throw new Error('Failed to approve rectification.');
            } catch (err) {
                throw new Error(err);
            }
        },

        async approveExtension(_, { reportId, finalDate, finalRemarks }, context) {
            // const user = checkAuth(context);

            const report = await Report.findOne({ _id: reportId });

            if (!report) {
                throw new Error("can't find report");
            }
            report.extension.proposed.date = null;
            report.extension.proposed.remarks = null;
            report.extension.final.date = finalDate;
            report.extension.final.remarks = finalRemarks;
            report.extension.status = "Approved";

            try {
                const savedReport = await report.save();
                if (savedReport) return savedReport;
                else throw new Error("Creation of report unsuccessful.");
            } catch (err) {
                throw new Error(err);
            }
        },

        async sendReportPDFById(_, { reportId, addressee, remarks }) {
            console.log(addressee);
            try {
                console.log("report ID is ", reportId);
                const report = await Report.findById(reportId);

                if (report) {
                    console.log(report.auditorId);
                    const auditor = await Auditor.findById(report.auditorId);

                    if (auditor){
                        console.log("auditor name is ",auditor.name);
                        // const report = {somth: "smth", total: 98, item1: "not dusty", item1score: 1, item2: "not wet", item2score: 0};
                        pdf.create(pdfTemplate(report, auditor.name), options).toFile(
                            "result.pdf",
                            (err) => {
                                if (err) {
                                    throw new Error(err);
                                }
                                console.log("pdf successfully created");
                                sendPDFEmail(addressee, remarks);

                            }
                        );
                    } else throw new Error("auditor not found");
                } else throw new Error("Report not found.");
            } catch (err) {
                throw new Error(err);
            }
        },

        async sendEmail(_, { from, to, title, body }) {
            console.log(
                "sending from",
                from,
                "to",
                to,
                "\n",
                title,
                "\n",
                body
            );
            try {
                sendEmail(from, to, title, body);
            } catch (err) {
                throw new Error(err);
            }
            return "success";
        },

        // async createReport(_, { body }) {

        // {
        //     "createReportBody": {
        //       "type": "fnb",
        //       "tenantId": "000t",
        //       "auditDate": "some date",
        //       "status": "audited",
        //       "images": [
        //         {
        //           "nonCompliances": ["img1", "img2"],
        //           "nonComplRemarks": "remarks"
        //         }
        //       ]
        //     }
        //   }

        // "createReportBody": {
        //     "type": report.type,
        //     "tenantId": report.tenantId,
        //     "auditDate": Date.now().toString,
        //     "status": status,
        //     "checklist": report.checklist,
        //     "images": images
        // }

        // 1. Retrieve the links array in images
        // console.log(body);
        // const lineItemIDs = Object.keys(body);
        // console.log(images);
        // const extractedLinks = lineItemIDs.map(lineItemId => images[lineItemId].links);

        // const imagesInput = lineItemIDs.map(lineItemId => {
        //     return {
        //         nonCompliances: images[lineItemId].links,
        //         nonComplRemarks: images[lineItemId].remarks
        //     }
        // })

        // console.log(imagesInput);
        // return imagesInput;
        //             const arr = [{ name: 'Star Wars' }, { name: 'The Empire Strikes Back' }];
        // Movies.insertMany(arr, function(error, docs) {});

        //     const newReport = new Report({
        //         ...body
        //     })

        //     try {
        //         const report = await newReport.save();

        //         if (report) {
        //             return report;
        //         } else {
        //             throw new Error('Creation of report unsuccessful.');
        //         }
        //     } catch (err) {
        //         throw new Error(err);
        //     }
        // }
    },
};

// let reportBody = {
//     type: "fnb",
//     tenantId: body.tenantId,
//     auditorId: "605c724420a3710f11856433",
//     auditDate: "26 March 2021",
//     checklist: [
//         {
//             category: "1. Professionalism & Staff Hygiene (10%)",
//             weightage: 10,
//             score: 10,
//             subcategories: [
//                 {
//                     subcategory: "Professionalism",
//                     lineItems: [
//                         {
//                             lineItem:
//                                 "Shop is open and ready to service patients/visitors according to operating hours.",
//                         },
//                         {
//                             lineItem:
//                                 "Staff Attendance: adequate staff for peak and non-peak hours.",
//                         },
//                         {
//                             lineItem:
//                                 "At least one (1) clearly assigned person in-charge on site.",
//                         },
//                     ],
//                 },
//                 {
//                     subcategory: "Staff Hygiene",
//                     lineItems: [
//                         {
//                             lineItem:
//                                 "Staff who are unfit for work due to illness should not report to work.",
//                         },
//                         {
//                             lineItem:
//                                 "Staff who are fit for work but suffering from the lingering effects of a cough and/or cold should cover their mouths with a surgical mask.",
//                         },
//                     ],
//                 },
//             ],
//         },
//         {
//             category: "2. Housekeeping & General Cleanliness (20%)",
//             weightage: 20,
//             score: 20,
//             subcategories: [
//                 {
//                     subcategory: "General Environment Cleanliness",
//                     lineItems: [
//                         {
//                             lineItem:
//                                 "Cleaning and maintenance records for equipment, ventilation and exhaust system.",
//                         },
//                         {
//                             lineItem:
//                                 "Adequate and regular pest control.\n-Pest control record.",
//                         },
//                         {
//                             lineItem:
//                                 "Goods and equipment are within shop boundary.",
//                         },
//                         {
//                             lineItem:
//                                 "Store display/ Shop front is neat and tidy.",
//                         },
//                     ],
//                 },
//             ],
//         },
//     ],
// }; // end report c

const computeNewPerfomance = function (tenant, report) {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];
    const currentMonth = months[new Date(report.extension.final.date).getMonth()];
    const currentMonthPerformance = tenant.performance.filter((item) => item.month === currentMonth);
    const performanceArray = [...tenant.performance]; //deep clone
    // 2. recompute average
    const newMonthPerformance = currentMonthPerformance[0]
    ? {
            month: currentMonth,
            entry: currentMonthPerformance[0].entry + 1,
            score:
                (currentMonthPerformance[0].entry * currentMonthPerformance[0].score + report.auditScore) /(currentMonthPerformance[0].entry + 1),
        } : { month: currentMonth, entry: 1, score: report.auditScore };
    // 3. store back in tenant
    var found = false;
    for(var i = 0; i < performanceArray.length; i++) {
        if (performanceArray[i].month == currentMonth) {
            found = true;
            performanceArray[i] = newMonthPerformance;
            break;
        }
    }
    if (!found) {
        performanceArray.push(newMonthPerformance);
        console.log("not found");
    }
    return performanceArray;
};
