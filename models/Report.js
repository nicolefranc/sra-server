import { model, Schema } from 'mongoose';

const reportSchema = new Schema({
    tenantId: String,
    auditorId: String,
    reportType: String,
    auditDate: new Date(),
    dueDate: Date,
});

export default model('Report', reportSchema);