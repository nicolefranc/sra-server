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
        }

        // Add getReportsByTenant and getReportById
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
            const newReport = new Report({
                ...body
            })

            try {
                const report = await newReport.save();

                if (report) {
                    return report;
                } else {
                    throw new Error('Creation of report unsuccessful.');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}