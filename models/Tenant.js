const { model, Schema } =require('mongoose') ;

const tenantSchema = new Schema({ //creates a mongoose schema
    name: String,
    institution: String,
    types: [String],
    email: String,
    password: String,
    createdAt: String,
    activated: Boolean
});

module.exports = model('Tenant', tenantSchema); 
// ^  creates a mongoose 'model' and subsequently exports it

