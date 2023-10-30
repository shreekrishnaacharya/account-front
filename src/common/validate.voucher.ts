export function validateVoucher(formData: any) {
    let totalDr = 0;
    let totalCr = 0;
    const drLedger: any = {};
    const crLedger: any = {};
    formData.drEntry.forEach((e: any) => {
        totalDr += e.amount;
        drLedger[e.ledger_id] = e.ledger_id;
    });
    formData.crEntry.forEach((e: any) => {
        totalCr += e.amount;
        crLedger[e.ledger_id] = e.ledger_id;
    });
    if (totalCr != totalDr) {
        return false;
    }
    return true;
}