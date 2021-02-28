const { model, Schema } =require('mongoose') ;

const tenantSchema = new Schema({
    username: String, //to be replaced with TenantID
    password: String,
    email: String,
    createdAt: String,
});

module.exports = model('Tenant', tenantSchema);
