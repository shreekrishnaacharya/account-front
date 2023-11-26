import { DrCr } from "common/all.enum";
import { Dayjs } from "dayjs";



export interface ILedger {
    id: string;
    name: string;
    code: string;
    ledger_group_id: string;
    ledgerGroup: ILedgerGroup;
    is_fixed: string;
}


export interface ILedgerGroup {
    id: string;
    name: string;
    code: string;
    bs_head: string;
    account_side: string;
    is_fixed: string;
    created_at: string
}

export interface IFiscalYear {
    id: string;
    name: string;
    opening_np: string;
    opening_en: string;
    closing_np: string;
    closing_en: string;
    is_closed: string;
    is_active: string;
    bill_no: string;
    previous_year: string;
}

export interface IEmployee {
    id: string;
    img: string;
    name: string;
    gender: string;
    married: string;
    address1: string;
    address2: string;
    email: string;
    phone1: string;
    phone2: string;
    type: string;
    dob_np: string;
    dob_en: string;
    doj_np: string;
    doj_en: string;
    bank_no: string;
    qualification: string;
    status: string;
}

export interface IPayroll {
    id: string;
    ledger_id: string;
    employee_id: string;
    amount: number;
    type: string
    status: string;
    ledger: ILedger
}

export interface IPayroll {
    id: string;
    ledger_id: string;
    employee_id: string;
    amount: number;
    type: string
    status: string;
    ledger: ILedger
}

export interface IPayrollSetting {
    id: string;
    ledger: ILedger;
    ledger_id: string;
    max_amount: string
}

export interface ISalaryVoucher {
    dr_cr: DrCr,
    ledger_id: string,
    ledger: ILedger,
    amount: number
}

export interface ISalaryPost {
    employee: IEmployee,
    employee_id: string,
    plus: ISalaryVoucher[],
    minus: ISalaryVoucher[],
    plusTotal: number,
    minusTotal: number
}