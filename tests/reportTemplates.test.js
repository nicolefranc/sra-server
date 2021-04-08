import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import { getClient } from './utils/getClient';
import ReportTemplate from '../models/ReportTemplate';
const mongoose = require('mongoose');

const client = getClient();

beforeAll(async () => {
    await mongoose
        .connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
});

describe('Tests the Report Templates', () => {
    it('should save template to the database', async () => {
        const createTemplate = gql`
            mutation {
                createReportTemplate(body: {
                    type: "fnb",
                    checklist: [
                        {
                            category: "1. Professionalism & Staff Hygiene (10%)",
                            weightage: 10,
                            score: 10,
                            subcategories: [
                                {
                                    subcategory: "Professionalism",
                                    lineItems: [
                                        {
                                            lineItem: "Shop is open and ready to service patients/visitors according to operating hours.",
                                        },
                                        {
                                            lineItem: "Staff Attendance: adequate staff for peak and non-peak hours.",
                                        },
                                        {
                                            lineItem: "At least one (1) clearly assigned person in-charge on site.",
                                        }
                                    ]
                                },
                                {
                                    subcategory: "Staff Hygiene",
                                    lineItems: [
                                        {
                                            lineItem: "Staff who are unfit for work due to illness should not report to work.",
                                        },
                                        {
                                            lineItem: "Staff who are fit for work but suffering from the lingering effects of a cough and/or cold should cover their mouths with a surgical mask.",
                                        },
                                    ]
                                }
                            ]
                        }]
                }) {
                    type
                    checklist {
                    category
                    weightage
                    score
                    subcategories {
                        subcategory
                        subcatScore
                        lineItems {
                        lineItem
                        complied
                        }
                    }
                    }
                }
            }
        `;

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

        const { data } = await client.query({
            query: fetchTemplate
        })
        
        expect(data.getAllReportTemplates.length).toBe(1);
    });
})

afterAll(async () => {
    await ReportTemplate.deleteMany();
});