import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import { getClient } from './utils/getClient';
import Report from '../models/Report';
import Auditor from '../models/Auditor';
const mongoose = require('mongoose');

const client = getClient();
let authenticatedClient;
let tenantId;

beforeAll(async () => {
    await mongoose
        .connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    // const createTenant = gql`mutation { createTenant(createTenantInput: {
    //     name: "test tenant 1", email: "test1@tenant.com", institution: "test1", type: [""]
    // }) { id } }`

    const createAuditor = gql`
        mutation {
            createAuditor(createAuditorInput: {
                name: "test auditor",
                email: "test@auditor.com",
                institution: "test"
                role: "staff"
            }) { token }
        }
    `;

    const authenticatedUser = await client.mutate({ mutation: createAuditor });
    authenticatedClient = getClient(authenticatedUser.data.createAuditor.token);
    // const { data } = await client.mutate({ mutation: createTenant });
    // tenantId = data.createTenant.id;
    // console.log(tenantId);
});

describe('Tests the Report Mutation', () => {
    it('should not allow a non-authenticated user to create a REPORT', async () => {
        const createReport = gql`
            mutation {
                createReport(body: { type : "fnb", tenantId : "606f669ae9047e3b8589cd7f", auditDate : "09 Apr 2021", createdDate : "09 Apr 2021", status : "audited", extension :{ proposed :{ date : "16 Apr 2021", remarks :null}, final :{ date : "16 Apr 2021", remarks :null}, status : "initial" }, auditScore :99.28571428571428, remarks : "wrwer",
                    checklist:[{ id : "60496242cb494322f2b08408", category : "1. Professionalism & Staff Hygiene (10%)", weightage :10, score :9.285714285714286, subcategories :[{ id : "60496242cb494322f2b08409", subcategory : "Professionalism", subcatScore :66.66666666666666, lineItems :[{ id : "60496242cb494322f2b0840a", lineItem : "Shop is open and ready to service patients/visitors according to operating hours.", complied :false},{ id : "60496242cb494322f2b0840b", lineItem : "Staff Attendance: adequate staff for peak and non-peak hours.", complied :true},{ id : "60496242cb494322f2b0840c", lineItem : "At least one (1) clearly assigned person in-charge on site.", complied :true}]},{ id : "60496242cb494322f2b0840d", subcategory : "Staff Hygiene", subcatScore :100, lineItems :[{ id : "60496242cb494322f2b0840e", lineItem : "Staff who are unfit for work due to illness should not report to work.", complied :true},{ id : "60496242cb494322f2b0840f", lineItem : "Staff who are fit for work but suffering from the lingering effects of a cough and/or cold should cover their mouths with a surgical mask.", complied :true},{ id : "60496242cb494322f2b08410", lineItem : "Clean clothes/uniform or aprons are worn during food preparation and food service.", complied :true},{ id : "60496242cb494322f2b08411", lineItem : "Hair is kept tidy (long hair must be tied up) and covered with clean caps or hair nets where appropriate.", complied :true},{ id : "60496242cb494322f2b08412", lineItem : "Sores, wounds or cuts on hands, if any, are covered with waterproof and brightly-coloured plaster.", complied :true},{ id : "60496242cb494322f2b08413", lineItem : "Hands are washed thoroughly with soap and water, frequently and at appropriate times.", complied :true},{ id : "60496242cb494322f2b08414", lineItem : "Fingernails are short, clean, unpolished and without nail accessories.", complied :true},{ id : "60496242cb494322f2b08415", lineItem : "No wrist watches/ rings or other hand jewellery (with exception of wedding ring) is worn by staff handling food.", complied :true},{ id : "60496242cb494322f2b08416", lineItem : "Food is handled with clean utensils and gloves.", complied :true},{ id : "60496242cb494322f2b08417", lineItem : "Disposable gloves are changed regularly and/ or in between tasks.", complied :true},{ id : "60496242cb494322f2b08418", lineItem : "Staff do not handle cash with gloved hands.", complied :true}]}]}],
                }) { type status }
            }
        `

        await expect(client.mutate({ mutation: createReport })).rejects.toThrowError('GraphQL error: You must be logged in. An authentication header must be provided.');
    });


    it('should create a REPORT for an authenticated user', async () => {
        console.log('tenantid' + tenantId);
        const createReport = gql`
            mutation {
                createReport(body: { type : "fnb", tenantId : "606f669ae9047e3b8589cd7f", auditDate : "09 Apr 2021", createdDate : "09 Apr 2021", status : "audited", extension :{ proposed :{ date : "16 Apr 2021", remarks :null}, final :{ date : "16 Apr 2021", remarks :null}, status : "initial" }, auditScore :99.28571428571428, remarks : "wrwer",
                    checklist:[{ id : "60496242cb494322f2b08408", category : "1. Professionalism & Staff Hygiene (10%)", weightage :10, score :9.285714285714286, subcategories :[{ id : "60496242cb494322f2b08409", subcategory : "Professionalism", subcatScore :66.66666666666666, lineItems :[{ id : "60496242cb494322f2b0840a", lineItem : "Shop is open and ready to service patients/visitors according to operating hours.", complied :false},{ id : "60496242cb494322f2b0840b", lineItem : "Staff Attendance: adequate staff for peak and non-peak hours.", complied :true},{ id : "60496242cb494322f2b0840c", lineItem : "At least one (1) clearly assigned person in-charge on site.", complied :true}]},{ id : "60496242cb494322f2b0840d", subcategory : "Staff Hygiene", subcatScore :100, lineItems :[{ id : "60496242cb494322f2b0840e", lineItem : "Staff who are unfit for work due to illness should not report to work.", complied :true},{ id : "60496242cb494322f2b0840f", lineItem : "Staff who are fit for work but suffering from the lingering effects of a cough and/or cold should cover their mouths with a surgical mask.", complied :true},{ id : "60496242cb494322f2b08410", lineItem : "Clean clothes/uniform or aprons are worn during food preparation and food service.", complied :true},{ id : "60496242cb494322f2b08411", lineItem : "Hair is kept tidy (long hair must be tied up) and covered with clean caps or hair nets where appropriate.", complied :true},{ id : "60496242cb494322f2b08412", lineItem : "Sores, wounds or cuts on hands, if any, are covered with waterproof and brightly-coloured plaster.", complied :true},{ id : "60496242cb494322f2b08413", lineItem : "Hands are washed thoroughly with soap and water, frequently and at appropriate times.", complied :true},{ id : "60496242cb494322f2b08414", lineItem : "Fingernails are short, clean, unpolished and without nail accessories.", complied :true},{ id : "60496242cb494322f2b08415", lineItem : "No wrist watches/ rings or other hand jewellery (with exception of wedding ring) is worn by staff handling food.", complied :true},{ id : "60496242cb494322f2b08416", lineItem : "Food is handled with clean utensils and gloves.", complied :true},{ id : "60496242cb494322f2b08417", lineItem : "Disposable gloves are changed regularly and/ or in between tasks.", complied :true},{ id : "60496242cb494322f2b08418", lineItem : "Staff do not handle cash with gloved hands.", complied :true}]}]}],
                }) { type status }
            }
        `

        const { data } = await authenticatedClient.mutate({ mutation: createReport });
        const report = await Report.find(data);
        expect(report).toBeTruthy();
    });


    it('should not allow auditor to audit tenant if not from a different institution', async () => {
        const createReport = gql`
            mutation {
                createReport(body: { type : "fnb", tenantId : "606f68ca366e6b3c628e5285", auditDate : "09 Apr 2021", createdDate : "09 Apr 2021", status : "audited", extension :{ proposed :{ date : "16 Apr 2021", remarks :null}, final :{ date : "16 Apr 2021", remarks :null}, status : "initial" }, auditScore :99.28571428571428, remarks : "wrwer",
                    checklist:[{ id : "60496242cb494322f2b08408", category : "1. Professionalism & Staff Hygiene (10%)", weightage :10, score :9.285714285714286, subcategories :[{ id : "60496242cb494322f2b08409", subcategory : "Professionalism", subcatScore :66.66666666666666, lineItems :[{ id : "60496242cb494322f2b0840a", lineItem : "Shop is open and ready to service patients/visitors according to operating hours.", complied :false},{ id : "60496242cb494322f2b0840b", lineItem : "Staff Attendance: adequate staff for peak and non-peak hours.", complied :true},{ id : "60496242cb494322f2b0840c", lineItem : "At least one (1) clearly assigned person in-charge on site.", complied :true}]},{ id : "60496242cb494322f2b0840d", subcategory : "Staff Hygiene", subcatScore :100, lineItems :[{ id : "60496242cb494322f2b0840e", lineItem : "Staff who are unfit for work due to illness should not report to work.", complied :true},{ id : "60496242cb494322f2b0840f", lineItem : "Staff who are fit for work but suffering from the lingering effects of a cough and/or cold should cover their mouths with a surgical mask.", complied :true},{ id : "60496242cb494322f2b08410", lineItem : "Clean clothes/uniform or aprons are worn during food preparation and food service.", complied :true},{ id : "60496242cb494322f2b08411", lineItem : "Hair is kept tidy (long hair must be tied up) and covered with clean caps or hair nets where appropriate.", complied :true},{ id : "60496242cb494322f2b08412", lineItem : "Sores, wounds or cuts on hands, if any, are covered with waterproof and brightly-coloured plaster.", complied :true},{ id : "60496242cb494322f2b08413", lineItem : "Hands are washed thoroughly with soap and water, frequently and at appropriate times.", complied :true},{ id : "60496242cb494322f2b08414", lineItem : "Fingernails are short, clean, unpolished and without nail accessories.", complied :true},{ id : "60496242cb494322f2b08415", lineItem : "No wrist watches/ rings or other hand jewellery (with exception of wedding ring) is worn by staff handling food.", complied :true},{ id : "60496242cb494322f2b08416", lineItem : "Food is handled with clean utensils and gloves.", complied :true},{ id : "60496242cb494322f2b08417", lineItem : "Disposable gloves are changed regularly and/ or in between tasks.", complied :true},{ id : "60496242cb494322f2b08418", lineItem : "Staff do not handle cash with gloved hands.", complied :true}]}]}],
                }) { type status }
            }
        `

        await expect(authenticatedClient.mutate({ mutation: createReport })).rejects.toThrowError('GraphQL error: AuthenticationError: You are not authorized to audit this tenant');
    });

    // it('should save draft to the database', async () => {
    //     const createTemplate = gql``

    //     const { data } = await client.mutate({ mutation: createTemplate });
        
    //     const reportTemplate = await ReportTemplate.findOne({ type: 'fnb' });
    //     expect(reportTemplate).toBeTruthy();
    // })

    // it('should not be null', async () => {
    //     const fetchTemplate = gql`
    //        query {
    //            getAllReportTemplates { type }
    //        } 
    //     `;

    //     const { data } = await client.query({ query: fetchTemplate })
        
    //     expect(data.getAllReportTemplates.length).toBe(1);
    // });
})

afterAll(async () => {
    await Report.deleteMany();
    await Auditor.deleteMany();
    // await Tenant.deleteMany();
});