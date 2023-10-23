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