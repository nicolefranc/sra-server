import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import { getClient } from './utils/getClient';
import ReportTemplate from '../models/ReportTemplate';
const mongoose = require('mongoose');

const client = getClient();

// beforeAll(async () => {
//     await mongoose
//         .connect(process.env.MONGO_DB_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
// });

describe('Tests the Report Templates', () => {
    it('should save report to the database', async () => {
        const createTemplate = gql``

        const { data } = await client.mutate({ mutation: createTemplate });
        
        const reportTemplate = await ReportTemplate.findOne({ type: 'fnb' });
        expect(reportTemplate).toBeTruthy();
    });

    it('should save draft to the database', async () => {
        const createTemplate = gql``

        const { data } = await client.mutate({ mutation: createTemplate });
        
        const reportTemplate = await ReportTemplate.findOne({ type: 'fnb' });
        expect(reportTemplate).toBeTruthy();
    })

    it('should not be null', async () => {
        const fetchTemplate = gql`
           query {
               getAllReportTemplates { type }
           } 
        `;

        const { data } = await client.query({ query: fetchTemplate })
        
        expect(data.getAllReportTemplates.length).toBe(1);
    });
})

afterAll(async () => {
    await Report.deleteMany();
});