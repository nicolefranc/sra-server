const { gql } = require("apollo-server");

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
    type: [String!]
    email: String!
    password: String!
    createdAt: String!
    activated: String!
    token: String
    performance: [Performance]
  }

  type Performance {
    month: String!
    key: String!
    score: Int!
  }
  input CreateAuditorInput {
    name: String!
    email: String!
    institution: String!
    role: String!
  }

  input CreateTenantInput {
    name: String!
    email: String!
    institution: String!
    type: [String!]
  }

  type LineItemImage {
    lineItemId: String
    nonCompliances: [String]
    nonComplRemarks: String
    rectifications: [String]
    rectRemarks: String
  }

  input RegisterInput {
    regToken: String!
    password: String!
    confirmPassword: String!
  }

  type LineItem {
    id: ID
    lineItem: String,
    complied: Boolean,
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
    id: ID
    type: String
    tenantId: Tenant
    auditorId: Auditor
    auditDate: String
    auditScore: Int
    status: String
    extension: Extension
    checklist: [Checklist]
    images: [ID]
  }

  type ReportTemplate {
    type: String!
    checklist: [Checklist]!
  }

  input ILineItems {
    id: String
    lineItem: String
    complied: Boolean
  }

  input ISubcategories {
    subcategory: String
    subcatScore: Float
    lineItems: [ILineItems]
  }

  input IChecklist {
    category: String!
    weightage: Int!
    score: Float!
    subcategories: [ISubcategories]
  }

  input IImages {
    lineItemId: String
    nonCompliances: [String]
    nonComplRemarks: String
    rectifications: [String]
    rectRemarks: String
  }

  # input ReportInput {
  #   type: String!
  #   tenantId: String!
  #   auditDate: String
  #   status: String!
  #   checklist: [IChecklist]
  #   images: [IImages]!
  # }

  input ReportInput {
    tenantId: String
  }

  input TemplateInput {
    type: String!
    checklist: [IChecklist]!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    uri: String!
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

    getAllReportsByTenant(tenantId: String!): [Report]
    getAllReportsByAuditor(auditorId: String!): [Report]
    getReportById(reportId: String!): Report
    getReportPDFById(reportId: String!): String
    getReportByAuditorAndStatus(auditorId: String!, status: String!): [Report]
    getReportByTenantAndStatus(tenantId: String!, status: String!): [Report]
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
    sendReportPDFById(reportId: String!, addressee: [String!], remarks: String!): String

    singleUpload(file: Upload!): File
    multipleUploads(files: [Upload], id: String!): [File]
    deleteUpload(filename: String!): Boolean
  }
`
//RegisterInput : 2 inputs because only email and name is already created and stored by the creator