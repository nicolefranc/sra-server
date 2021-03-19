const { model, Schema } = require('mongoose');
const JSONTransport = require('nodemailer/lib/json-transport');

const tenantSchema = new Schema({ //creates a mongoose schema
    name: String,
    institution: String,
    types: [String],
    email: String,
    password: String,
    createdAt: String,
    activated: Boolean,
    performance: [{
        month: String,
        key: String,
        score: String,
    }],
});

module.exports = model('Tenant', tenantSchema);
// ^  creates a mongoose 'model' and subsequently exports it

//  {loading, error, data} = useQuery(GET_DOGS);

// performanceAll = []
// for (i = 9; i < data.length;i++){
//    performanceAll.push(data.performance)
//}