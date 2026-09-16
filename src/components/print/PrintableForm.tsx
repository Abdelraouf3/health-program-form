import type { ReactNode } from 'react'
import type { ReportFormData } from '../../types/form'
import './PrintableForm.scss'

interface Props {
  data: ReportFormData
}

const Value = ({ children }: { children?: ReactNode }) => (
  <div className="p-value">{children || ' '}</div>
)

const Cell = ({
  label,
  children,
  className = '',
}: {
  label: string
  children?: ReactNode
  className?: string
}) => (
  <div className={`p-cell ${className}`}>
    <div className="p-label text-center min-w-[150px]">{label}</div>
    <Value>{children}</Value>
  </div>
)

export function PrintableForm({ data }: Props) {

  return (
  
    <div className="print-sheet" dir="rtl">

      <header className="print-header mb-5">
      
        <div className="ministry-logo">
          <img src="/logo2.png" alt="شعار وزارة التعليم" />
        </div>

        <h4 className='ministry-text'>الإدارة العامة للتعليم بمنطقة حائل</h4>

      </header>

      <section className="print-section">

        <Cell label="اسم المدرسة" className='flex-row! justify-center mb-3'>
          {data.schoolName}
        </Cell>

        <Cell label="اسم البرنامج الصحي" className='flex-row! justify-center mb-5'>
          {data.healthProgramName}
        </Cell>

        <div className="p-table two-cols mb-5">

          <Cell label="المنفذ/ون">
            {data.implementers}
          </Cell>

          <Cell label="المشارك/ون">
            {data.participants}
          </Cell>

        </div>

        <div className="p-table three-cols mb-5">

          <Cell label="مكان التنفبذ">
            {data.implementationLocation}
          </Cell>

          <Cell label="مدة التنفيذ">
            {data.implementationDuration}
          </Cell>

          <Cell label="تاريخ التنفيذ">
            {data.implementationDate}
          </Cell>

        </div>

        <div className="p-table two-cols mb-5">

          <Cell label="المستفيدون / العدد">
            {data.beneficiaryCount}
          </Cell>

          <Cell label="المجال">
            {data.field}
          </Cell>

        </div>
      
      </section>

      <section className="print-section procedure-print">

        <div className="p-procedure">

          <div className="procedure-title"> خطوات التنفيذ / الوصف</div>

          <div>
            {data.implementationSteps
              .filter(Boolean)
              .map((p, i) => (
                <div className="procedure-line" key={i}>
                  <span>{i + 1}</span>
                  {p}
                </div>
              ))}
          </div>

        </div>
      </section>

      <section className="print-section procedure-print">

        <div className="p-procedure">

          <div className="procedure-title"> الأهداف</div>

          <div>
            {data.objectives
              .filter(Boolean)
              .map((o, i) => (
                <div className="procedure-line" key={i}>
                  <span>{i + 1}</span>
                  {o}
                </div>
              ))}
          </div>

        </div>
      </section>

      {/* <section className="print-section evidence-print">

        <div className="evidence-box block">

          <h3 className='flex items-center justify-center py-3 bg-[#eee] font-bold border-b border-black'> الشواهد / الصور </h3>

          <div className="photos">

            {data.images.length ? (
              data.images.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt="شاهد تنفيذ"
                />
              ))
            ) : (
              <span>لا توجد صور</span>
            )}

          </div>

        </div>
      </section> */}

      <section className={`print-section evidence-print ${ data.images.length > 2 ? "evidence-new-page": "" }`}>
      
        <div className="evidence-box block!">
      
          <h3 className="evidence-title">
            الشواهد / الصور
          </h3>
      
          <div className="photos">
          
            {data.images.length ? (
            
              data.images.map((image) => (
              
                <img
                  key={image.id}
                  src={image.url}
                  alt="شاهد تنفيذ"
                  className={`${ data.images.length > 2 ? "": "h-[280px]! object-contain!" }`}
                />
              
              ))
            
            ) : (
            
              <span>لا توجد صور</span>
            
            )}
          
          </div>
      
        </div>
      
      </section>

      <section className={`signatures grid-cols-2! ${ data.images.length > 2 ? "mt-5!": "" }`}>

        <div className="signature-label">
          الموجه/ة الصحي/ة
        </div>

        <div className="signature-label">
          مدير/ة المدرسة
        </div>

        <div className="signature-value">
          {data.healthCounselorName || ' '}
        </div>

        <div className="signature-value">
          {data.schoolPrincipalName || ' '}
        </div>

      </section>

    </div>
  )
}