const Report = require("../../models/Report");
const ReportTemplate = require("../../models/ReportTemplate");

const pdf = require("html-pdf");

const pdfTemplate = require("../../documents");
const sendEmail = require("../../emails/email");
const checkAuth = require("../../util/check-auth");
const Tenant = require("../../models/Tenant");
const { AuthenticationError } = require("apollo-server-errors");

var options = {
    "format": "A4",
    "border": {
        "top": "30px",            // default is 0, units: mm, cm, in, px
        "bottom": "30px"
      },
    }

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
                const reports = await Report.find().populate({
                        path: 'tenantId',
                        match: doc => ({ _id: tenantId })
                    }).populate({
                        path: 'auditorId'
                    })
                if (reports) {
                    return reports;   
                } else {
                    throw new Error('Reports not found.')
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async getAllReportsByAuditor(_, { auditorId }) {
            try {
                const reports = await Report.find().populate({
                        path: 'auditorId',
                        match: doc => ({ _id: auditorId })
                    }).populate({
                        path: 'tenantId'
                    })
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
                    .populate('tenantId')
                    .populate('auditorId');
                if (report) return report;
                else throw new Error('Report not found.');
            } catch (err) {
                throw new Error(err);
            }
        },

        async getReportByAuditorAndStatus(_, { auditorId, status }) {
            try {
                console.log(status);
                const report = await Report.find()
                    .where('status').equals(status)
                    .populate({
                        path: 'auditorId',
                        match: doc => ({ _id: auditorId })
                    })
                    .populate('tenantId');
                if (report) return report;
                else throw new Error('Report not found.');
            } catch (err) {
                throw new Error(err);
            }
        },

        async getReportByTenantAndStatus(_, { tenantId, status }) {
            try {
                console.log(status);
                const report = await Report.find()
                    .where('status').equals(status)
                    .populate({
                        path: 'tenantId',
                        match: doc => ({ _id: tenantId })
                    })
                    .populate('auditorId');
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
                    return `${__dirname}../../result.pdf`;
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
                const isAuthorized = user.institutions.includes(tenant.institution);
                if (!isAuthorized) throw new AuthenticationError('You are not authorized to audit this tenant');
            } catch (err) {
                throw new Error(err);
            }

            const report = new Report({ auditorId: user.id, ...body });
            
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
                    // const report = {somth: "smth", total: 98, item1: "not dusty", item1score: 1, item2: "not wet", item2score: 0};
                    pdf.create(pdfTemplate(report), options).toFile(
                        "result.pdf",
                        (err) => {
                            if (err) {
                                throw new Error(err);
                            }
                            console.log("pdf successfully created");
                            sendEmail(addressee, remarks);
                        }
                    )
                } else throw new Error("Report not found.");
            } catch (err) {
                throw new Error(err);
            }
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