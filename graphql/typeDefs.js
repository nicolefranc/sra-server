const gql = require("graphql-tag");

module.exports = gql`
  type Auditor {
    id: ID!
    role: String!
    institutions: [String!]!
    name: String!
    email: String!
    password: String!
    createdAt: String!
    activated: String!
    token: String
  }

  type Tenant {
    id: ID!
    name: String!
    institution: String!
    types: [String!]
    email: String!
    password: String!
    createdAt: String!
    activated: String!
    token: String
  }

  input CreateAuditorInput {
    name: String!
    institution: String!
    role: String!
  }

  input CreateTenantInput {
    name: String!
    institution: String!
    types: [String!]
  }
    type LineItemImage {
      nonCompliances: [String],
      nonComplRemarks: String,
      rectifications: [String],
      rectRemarks: String
    }

  input RegisterInput {
    regToken: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
    type LineItem {
      id: ID
      lineItem: String,
      complied: Boolean,
      images: [LineItemImage]
    }

    type Subcategory {
      id: ID
      subcategory: String
      subcatScore: Float
      lineItems: [LineItem]
    }

  type ExtensionObject {
    date: String
    remarks: String
  }
  
  type Checklist {
    id: ID
    category: String
    weightage: Int
    score: Int
    subcategories: [Subcategory]
  }

  type Extension {
    proposed: ExtensionObject
    final: ExtensionObject
    status: String
  }

  type Report {
    type: String
    tenantId: String
    auditorId: String
    auditDate: String
    auditScore: Int
    extension: Extension
    checklist: [Checklist]
  }

  type ReportTemplate {
    type: String!
    checklist: [Checklist]!
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
    score: Int!
    subcategories: [ISubcategories]
  }

  input ReportInput {
    type: String!
    tenantId: String!
    auditorId: String!
    auditDate: String
    auditScore: Int!
    status: String!
    checklist: [IChecklist]
  }

  input TemplateInput {
    type: String!
    checklist: [IChecklist]!
  }

  type Query {
    getAllAuditors: [Auditor]
    getAuditorsByInstitution(institution: String!): [Auditor]
    getAuditorByEmail(email: String!): Auditor
    getAuditorById(id: String!): Auditor
    getAllTenants: [Tenant]
    getTenantsByInstitution(institution: String!): [Tenant]
    getTenantsByAuditor(auditorId: String!): [Tenant]
    getTenantByEmail(email: String!): Tenant
    getTenantById(id: String!): Tenant

    getReportTemplate(type: String!): ReportTemplate!
    getAllReportTemplates: [ReportTemplate]!
  }

  type Mutation {
    createAuditor(createAuditorInput: CreateAuditorInput): Auditor!
    registerAuditor(registerInput: RegisterInput): Auditor!
    loginAuditor(email: String!, password: String!): Auditor!
    createTenant(createTenantInput: CreateTenantInput): Tenant!
    registerTenant(registerInput: RegisterInput): Tenant!
    loginTenant(email: String!, password: String!): Tenant!

    createReportTemplate(body: TemplateInput!): ReportTemplate!
    createReport(body: ReportInput!): Report!
  }
`
//RegisterInput : 2 inputs because only email and name is already created and stored by the creator