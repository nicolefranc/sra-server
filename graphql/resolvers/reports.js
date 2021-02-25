const ReportTemplate = require('../../models/ReportTemplate');
const Auditor = require('../../models/Auditor');
module.exports = {
    Query: {
        async getReportTemplate(_, { templateType }) {
            try {
                const reportTemplate = await ReportTemplate.findOne({ templateType: templateType });
                console.log(reportTemplate);
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
                console.log(templates);
                if (templates) {
                    return templates;
                } else {
                    throw new Error('Report templates not found.');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}