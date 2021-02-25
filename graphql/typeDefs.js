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

    input ILineItems {
        lineItem: String,
    }

    input ISubcategories {
        subcategory: String
        lineItems: [ILineItems]
    }

    input IChecklist {
        category: String!
        weightage: Int!
        subcategories: [ISubcategories]
    }

    input TemplateInput {
        templateType: String!
        checklist: [IChecklist]
    }

    type Query {
        getAllAuditors: [Auditor]
        getAuditorById(auditorId: String!): Auditor
        getReportTemplate(templateType: String!): Report
        getAllReportTemplates: [Report]
    }
    
    type Mutation {
        createReportTemplate(body: TemplateInput!): Report!
    }
`