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
    email: String!
    password: String!
    createdAt: String!
    activated: String!
    token: String
  }


  input CreateInput {
    name: String!
    institution: String!
    role: String!
  }

  input RegisterInput {
    regToken: String!
    email: String!
    password: String!
    confirmPassword: String!
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
    complied: Boolean,
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
    score: Int
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
    score: Int!
    subcategories: [ISubcategories]
  }

  input TemplateInput {
    templateType: String!
    checklist: [IChecklist]
  }

  type Query {
    getAllAuditors: [Auditor]
    getAllTenants: [Tenant]

    getAllReportTemplates: [Report]
    getReportTemplate(templateType: String!): Report
  }

  type Mutation {
    createAuditor(createInput: CreateInput): Auditor!
    registerAuditor(registerInput: RegisterInput): Auditor!
    loginAuditor(email: String!, password: String!): Auditor!
    createTenant(name: String!,institution:String!): Tenant!
    registerTenant(registerInput: RegisterInput): Tenant!
    loginTenant(email: String!, password: String!): Tenant!

    createReportTemplate(body: TemplateInput!): Report!
  }

`;

//RegisterInput : 2 inputs because only email and name is already created and stored by the creator