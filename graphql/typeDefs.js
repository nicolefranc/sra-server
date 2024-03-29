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
    expiry: String
  }

  type Performance {
    month: String!
    entry: String!
    score: Float!
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

  input RegisterInput {
    regToken: String!
    password: String!
    confirmPassword: String!
  }

  type LineItemImage {
    lineItemId: String
    lineItem: String
    nonCompliances: [String]
    nonComplRemarks: String
    rectifications: [String]
    rectRemarks: String
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

  
  type Checklist {
    id: ID
    category: String
    weightage: Int
    score: Float
    subcategories: [Subcategory]
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

  type Report {
    id: ID
    type: String
    tenantId: Tenant
    auditorId: Auditor
    auditDate: String
    createdDate: String
    auditScore: Float
    status: String
    remarks: String
    extension: Extension
    checklist: [Checklist]
    images: [LineItemImage]
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
    id: String
    subcategory: String
    subcatScore: Float
    lineItems: [ILineItems]
  }

  input IChecklist {
    id: String
    category: String!
    weightage: Int!
    score: Float!
    subcategories: [ISubcategories]
  }

  input IImages {
    lineItemId: String
    lineItem: String
    nonCompliances: [String]
    nonComplRemarks: String
    rectifications: [String]
    rectRemarks: String
  }
  
  input IExtensionObject {
    date: String
    remarks: String
  }

  input IExtension {
    proposed: IExtensionObject
    final: IExtensionObject
    status: String
  }

  input ReportInput {
    type: String!
    tenantId: String!
    auditDate: String
    createdDate: String
    auditScore: Float
    status: String!
    extension: IExtension
    remarks: String
    checklist: [IChecklist]
    images: [IImages]!
  }

  # input ReportInput {
  #   tenantId: String
  # }

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
    getTenantByName(name: String!): Tenant

    getReportTemplate(type: String!): ReportTemplate!
    getAllReportTemplates: [ReportTemplate]!

    getAllReportsByTenant(tenantId: String!): [Report]
    getAllReportsByAuditor(auditorId: String!): [Report]
    getReportById(reportId: String!): Report
    getReportPDFById(reportId: String!): File!
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
    changeTenantExpiry(tenantId:String!, date:String!): Tenant!
    changeAuditorEmail(email: String!, id: String!): Auditor!
    changeTenantEmail(email: String!, id: String!): Tenant!
    addInstitution(inst: String!, id: String!): Auditor!
    removeInstitution(inst: String!, id: String!): Auditor!

    createReportTemplate(body: TemplateInput!): ReportTemplate!
    createReport(body: ReportInput!): Report!
    proposeExtension(reportId: String!, date: String!, remarks: String!): Report!
    approveExtension(reportId: String!, finalDate: String!, finalRemarks: String!): Report!
    sendReportPDFById(reportId: String!, addressee: [String!], remarks: String!): String
    sendEmail(from: String!, to: String!, title: String!, body: String!): String

    singleUpload(file: Upload!): File
    multipleUploads(files: [Upload], id: String!): [File]
    rectificationUploads(files: [Upload], id: String!): [File]
    deleteUpload(filename: String!): Boolean
    
    createRectification(id: String, images: [IImages]): Report
    approveRectification(id: String, status: String) : Report
  }
`
//RegisterInput : 2 inputs because only email and name is already created and stored by the creator