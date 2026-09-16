import { useState } from 'react'
import { ReportForm } from '../components/form/Form'
import { PrintableForm } from '../components/print/PrintableForm'
import { createInitialForm, type ReportFormData } from '../types/form'

export default function FormPage() {
  const [data, setData] = useState<ReportFormData>(createInitialForm)
  return <>
    <div className="no-print min-h-screen bg-slate-100"><ReportForm data={data} setData={setData}/></div>
    <div className="print-only"><PrintableForm data={data}/></div>
  </>
}
