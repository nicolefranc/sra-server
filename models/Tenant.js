import { model, Schema } from 'mongoose';

const tenantSchema = new Schema({
    tenantId: String,
    name: String,
    email: String,
});

export default model('Tenant', tenantSchema);
