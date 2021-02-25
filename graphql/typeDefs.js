const gql = require('graphql-tag');

module.exports = gql`
    type Auditor {
        auditorId: String!
        name: String!
        email: String!
        tenants: [String]!
    }

    type ExtensionObject {
        date: String
        remarks: String
    }

    type Extension {
        proposed: ExtensionObject
        final: ExtensionObject
        status: String
    }

    type LineItemImage {
        nonCompliances: [String],
        nonComplRemarks: String,
        rectifications: [String],
        rectRemarks: String
    }

    type LineItem {
        lineItem: String,
        complied: Int,
        images: [LineItemImage]
    }

    type Subcategory {
        subcategory: String
        subcatScore: Float
        lineItems: [LineItem]
    }

    type Checklist {
        category: String
        weightage: Int
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