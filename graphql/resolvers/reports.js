const ReportTemplate = require('../../models/ReportTemplate');

module.exports = {
    Query: {
        async getReportTemplate(_, { templateType }) {
            try {
<<<<<<< HEAD
                const reportTemplate = await ReportTemplate.findOne({ type: templateType });
                if (reportTemplate) {
                    return reportTemplate;
                } else {
                    console.log("can't find");

=======
                const reportTemplate = await ReportTemplate.findOne({ templateType: templateType });
                if (reportTemplate) {
                    return reportTemplate;
                } else {
>>>>>>> master
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
        }
    }
}