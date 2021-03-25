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
    type: [String!]
    email: String!
    password: String!
    createdAt: String!
    activated: String!
    token: String
    performance: [Performance]
  }

<<<<<<< HEAD
  type Performance {
    month: String!
    key: String!
    score: Int!
  }
=======
>>>>>>> master

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
<<<<<<< HEAD
    type: String
=======
    templateType: String
>>>>>>> master
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

<<<<<<< HEAD


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
=======
  type Query {
    getAllAuditors: [Auditor]
    getAllTenants: [Tenant]
>>>>>>> master

    getAllReportTemplates: [Report]
    getReportTemplate(templateType: String!): Report
  }

  type Mutation {
    createAuditor(createAuditorInput: CreateAuditorInput): Auditor!
    registerAuditor(registerInput: RegisterInput): Auditor!
    loginAuditor(email: String!, password: String!): Auditor!
    createTenant(createTenantInput: CreateTenantInput): Tenant!
    registerTenant(registerInput: RegisterInput): Tenant!
    loginTenant(email: String!, password: String!): Tenant!
<<<<<<< HEAD
=======

    createReportTemplate(body: TemplateInput!): Report!
  }
>>>>>>> master

    createReportTemplate(body: TemplateInput!): Report!
  }
`;

//RegisterInput : 2 inputs because only email and name is already created and stored by the creator