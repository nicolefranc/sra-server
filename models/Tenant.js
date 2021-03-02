const { model, Schema } =require('mongoose') ;

const tenantSchema = new Schema({
    tenantId: String,
    name: String,
    email: String,
    password: String,
    token: String,
    createdAt: String,
});

module.exports = model('Tenant', tenantSchema);

