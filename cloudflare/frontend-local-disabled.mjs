// Only aliased into the public frontend Worker build. SQLite stays local.
const unavailable=()=>{throw new Error('Local storage is unavailable on the public website.')}
export const readWorkspace=unavailable
export const saveCommand=unavailable
export const readImport=unavailable
export const importAvailable=()=>false
export const localRequestAllowed=()=>false
export const generateInvoice=unavailable
export const invoiceAllowed=()=>false
