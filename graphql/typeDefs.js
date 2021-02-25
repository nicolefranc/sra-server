const gql = require('graphql-tag');

module.exports = gql`
    type Auditor {
        auditorId: String!
        name: String!
        email: String!
        tenants: [String]!
    }

    type ExtensionObject {
        date: String!
        remarks: String!
    }

    type Extension {
        proposed: ExtensionObject
        final: ExtensionObject
    }

    type Subcategory {
        subcategory: String!
    }

    type Checklist {
        category: String!
        weightage: Int!
        subcategories: [Subcategory]
    }

    type Report {
        templateType: String
        tenantId: String
        auditorId: String
        auditDate: String
        auditScore: Int
        extension: Extension
        checklist: [Checklist]
    }

    type Query {
        getAllAuditors: [Auditor]
        getAuditorById(auditorId: String!): Auditor
        getReportTemplate(templateType: String!): Report
        getAllReportTemplates: [Report]
    }
    
    type Mutations {
        createReport(body: String!): Report!
    }
`