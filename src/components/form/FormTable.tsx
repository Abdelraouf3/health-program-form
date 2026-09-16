import type { ChangeEvent } from 'react'
import type { ReportFormData } from '../../types/form'

type Props = { data: ReportFormData; onChange: <K extends keyof ReportFormData>(key: K, value: ReportFormData[K]) => void }

const inputClass = 'w-full min-w-0 border-0 bg-transparent px-2 py-2 text-right outline-none focus:bg-teal-50'
const labelClass = 'bg-slate-100 px-2 py-2 text-center text-sm font-bold'

export function FormTable({ data, onChange }: Props) {
  const text = (key: keyof ReportFormData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => onChange(key, e.target.value as never)
  return (
    <div className="space-y-6">
      <section>
        {/* <h2 className="font-bold text-xl text-center mb-4">نموذج تقرير تنفيذ برنامج صحي</h2> */}
        
        <div className="grid grid-cols-[max-content_1fr] border border-[#cbd5e1] overflow-hidden mb-3">
        
          <div className={`${labelClass} px-4 w-48 shrink-0`}>اسم المدرسة</div>
          <input className={`inline-block  ${inputClass}`} value={data.schoolName} onChange={text('schoolName')} />
        
        </div>

        <div className="grid grid-cols-[max-content_1fr] border border-[#cbd5e1] overflow-hidden mb-5">
        
          <div className={`${labelClass} px-4 w-48 shrink-0`}> اسم البرنامج الصحي</div>
          <input className={`inline-block  ${inputClass}`} value={data.healthProgramName} onChange={text('healthProgramName')} />
        
        </div>

        <div className="form-table mb-3">
        
          <div className={labelClass}>
            المنفذ/ون
          </div>
          <input
            className={inputClass}
            value={data.implementers}
            onChange={text("implementers")}
          />
        
          <div className={labelClass}>
            المشارك/ون
          </div>
          <input
            className={inputClass}
            value={data.participants}
            onChange={text("participants")}
          />
        </div>

        <div className="form-table stats-grid mb-3">
          
            <div className={labelClass}>
              مكان التنفيذ
            </div>
            <input
              className={`md:hidden ${inputClass}`}
              value={data.implementationLocation}
              onChange={text("implementationLocation")}
            />
            <div className={labelClass}>
              مدة التنفيذ
            </div>
            <input
              className={`md:hidden ${inputClass}`}
              value={data.implementationDuration}
              onChange={text("implementationDuration")}
            />
            <div className={labelClass}>
              تاريخ التنفيذ
            </div>
            <input
              className={`md:hidden ${inputClass}`}
              type="date"
              value={data.implementationDate}
              onChange={text("implementationDate")}
            />
            <input
              className={`hidden md:block ${inputClass}`}
              value={data.implementationLocation}
              onChange={text("implementationLocation")}
            />
            <input
              className={`hidden md:block ${inputClass}`}
              value={data.implementationDuration}
              onChange={text("implementationDuration")}
            />
            <input
              className={`hidden md:block ${inputClass}`}
              type="date"
              value={data.implementationDate}
              onChange={text("implementationDate")}
            />
          
        </div>

        <div className="form-table">
          <div className={labelClass}>
            المستفيدون / العدد
          </div>
          <input
            className={inputClass}
            value={data.beneficiaryCount}
            onChange={text("beneficiaryCount")}
          />
        
          <div className={labelClass}>
            المجال
          </div>
          <input
            className={inputClass}
            value={data.field}
            onChange={text("field")}
          />
        
        </div>
      
      </section>

    </div>
  )
}