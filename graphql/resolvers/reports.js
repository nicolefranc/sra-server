const Report = require('../../models/Report');
const ReportTemplate = require('../../models/ReportTemplate');

module.exports = {
    Query: {
        async getReportTemplate(_, { type }) {
            try {

                const reportTemplate = await ReportTemplate.findOne({ type: type });
                if (reportTemplate) {
                    return reportTemplate;
                } else {
                    throw new Error('Report template not found.');
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
                    throw new Error('Report templates not found.');
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        // Add getReportsByTenant and getReportById
        async getAllReportsByTenant(_, { tenantId }) {
            try {
                const reports = await Report.find().where('tenantId').equals(tenantId);
                if (reports) {
                    return reports;   
                } else {
                    throw new Error('Reports not found.')
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async getReportById(_, { reportId }) {
            try {
                const report = await Report.findById(reportId);
                if (report) return report;
                else throw new Error('Report not found.');
            } catch (err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {
        async createReportTemplate(_, { body }) {
            console.log(body);

            const newTemplate = new ReportTemplate({
                ...body
            });

            try {
                const template = await newTemplate.save();

                if (template) {
                    return template;
                } else {
                    throw new Error('Add template unsuccessful.');
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async createReport(_, { body }) {
            console.log(body);
            let reportBody = {
                type: "fnb",
                tenantId: body.tenantId,
                auditorId: "605c724420a3710f11856433",
                auditDate: "26 March 2021",
                checklist: [
                    {
                        category: "1. Professionalism & Staff Hygiene (10%)",
                        weightage: 10,
                        score: 10,
                        subcategories: [
                            {
                                subcategory: "Professionalism",
                                lineItems: [
                                    {
                                        lineItem: "Shop is open and ready to service patients/visitors according to operating hours.",
                                    },
                                    {
                                        lineItem: "Staff Attendance: adequate staff for peak and non-peak hours.",
                                    },
                                    {
                                        lineItem: "At least one (1) clearly assigned person in-charge on site.",
                                    }
                                ]
                            },
                            {
                                subcategory: "Staff Hygiene",
                                lineItems: [
                                    {
                                        lineItem: "Staff who are unfit for work due to illness should not report to work.",
                                    },
                                    {
                                        lineItem: "Staff who are fit for work but suffering from the lingering effects of a cough and/or cold should cover their mouths with a surgical mask.",
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        category: "2. Housekeeping & General Cleanliness (20%)",
                        weightage: 20,
                        score: 20,
                        subcategories: [
                            {
                                subcategory: "General Environment Cleanliness",
                                lineItems: [
                                    {
                                        lineItem: "Cleaning and maintenance records for equipment, ventilation and exhaust system.",
                                        
                                    },
                                    {
                                        lineItem: "Adequate and regular pest control.\n-Pest control record.",
                                        
                                    },
                                    {
                                        lineItem: "Goods and equipment are within shop boundary.",
                                        
                                    },
                                    {
                                        lineItem: "Store display/ Shop front is neat and tidy.",
                                        
                                    },
                                ]
                            }
                        ]
                    },
                ]
            } // end report constant

            const newReport = new Report({ ...reportBody });
            try {
                const report = await newReport.save();
                if (report) return report;
                else throw new Error('Creation of report unsuccessful.');
            } catch (err) {
                throw new Error(err);
            }
        }

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
    }
}