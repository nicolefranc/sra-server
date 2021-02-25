import { model, Schema } from 'mongoose';

const reportSchema = new Schema({
    reportId: String,
    tenantId: String,
    auditorId: String,
    reportType: String,
    auditDate: new Date(),
    dueDate: Date,
});

export default model('Report', reportSchema);