
export const bsHeadList: any = {
    "fixed_assets": "Fixed Assets",
    "current_assets": "Current Assets",
    "current_liability": "Current Liability",
    "loan_payable": "Loan Payable",
    "reserve_and_surplus": "Reserve and Surplus",
    "direct_income": "Direct Income",
    "direct_expense": "Direct Expense",
    "indirect_income": "Indirect Income",
    "indirect_expense": "Indirect Expense"
}

export const BASE_URL = "http://localhost:5000";

export enum IsFixed {
    FIXED = "Fixed",
    NOT_FIXED = "Not Fixed"
}

export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
}

export enum EmploymentType {
    CONTRACT = "Contract",
    TEMPORARY = "Temporary",
    FULL_TIME = "Full Time"
  }

export enum YesNo {
    YES = "Yes",
    NO = "No"
}

export enum Status {
    ACTIVE = "Active",
    INACTIVE = "Inactive"
}

export enum Marriage {
    MARRIED = "Married",
    UNMARRIED = "Unmarried"
}

export const PayrollType =[{ id: "plus", label: "Plus", value: "plus" }, { id: "minus", label: "Minus", value: "minus" }]