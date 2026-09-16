import { useRef } from 'react'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { ImagePlus, Trash2, Printer } from 'lucide-react'
import type { ReportFormData, ReportImage } from '../../types/form'
import { FormTable } from './FormTable'

interface Props { data: ReportFormData; setData: Dispatch<SetStateAction<ReportFormData>> }

export function ReportForm({ data, setData }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const update = <K extends keyof ReportFormData>(key: K, value: ReportFormData[K]) => setData(prev => ({ ...prev, [key]: value }))
  const addImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const next: ReportImage[] = files.map(file => ({ id: crypto.randomUUID(), file, url: URL.createObjectURL(file) }))
    setData(prev => ({ ...prev, images: [...prev.images, ...next] }))
    e.target.value = ''
  }
  const removeImage = (id: string) => setData(prev => {
    const item = prev.images.find(image => image.id === id)
    if (item) URL.revokeObjectURL(item.url)
    return { ...prev, images: prev.images.filter(image => image.id !== id) }
  })
  const updateImplementationSteps = (index: number, value: string) => setData(prev => ({ ...prev, implementationSteps: prev.implementationSteps.map((p, i) => i === index ? value : p) }))
  const addImplementationSteps = () => setData(prev => ({ ...prev, implementationSteps: [...prev.implementationSteps, ''] }))
  const removeImplementationSteps = (index: number) => setData(prev => ({ ...prev, implementationSteps: prev.implementationSteps.filter((_, i) => i !== index) }))

  const updateObjectives = (index: number, value: string) => setData(prev => ({ ...prev, objectives: prev.objectives.map((p, i) => i === index ? value : p) }))
  const addObjectives = () => setData(prev => ({ ...prev, objectives: [...prev.objectives, ''] }))
  const removeObjectives = (index: number) => setData(prev => ({ ...prev, objectives: prev.objectives.filter((_, i) => i !== index) }))

  return (
    <div className="mx-auto max-w-6xl p-3 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-xl font-extrabold text-slate-900">نموذج تقرير تنفيذ برنامج صحي</h1><p className="text-sm text-slate-500">أدخل البيانات ثم استخدم زر الطباعة لحفظ نسخة PDF.</p></div>
        <button type="button" onClick={() => window.print()} className="no-print inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-bold text-white transition hover:bg-teal-800 cursor-pointer"><Printer size={18}/> حفظ PDF / طباعة</button>
      </div>

      <div className="rounded-2xl bg-white p-3 shadow-sm sm:p-6">
        <FormTable data={data} onChange={update} />
        <section className="mt-6">
          <div className="procedure-editor overflow-hidden rounded-lg border border-slate-300">
            <div className="bg-slate-100 p-3 text-center font-bold">خطوات التنفيذ / الوصف</div>
            {data.implementationSteps.map((implementationStep, index) => <div key={index} className="flex border-t border-slate-200"><span className="flex w-10 shrink-0 items-center justify-center bg-slate-50 text-sm font-bold">{index + 1}</span><input className="min-w-0 flex-1 px-3 py-3 outline-none focus:bg-teal-50" value={implementationStep} onChange={e => updateImplementationSteps(index, e.target.value)} placeholder={`الإجراء ${index + 1}`} /><button type="button" aria-label="حذف الإجراء" className="px-3 text-slate-400 hover:text-red-600 cursor-pointer" onClick={() => removeImplementationSteps(index)}><Trash2 size={17}/></button></div>)}
          </div>
          <button type="button" onClick={addImplementationSteps} className="no-print mt-2 rounded-lg border border-teal-700 px-4 py-2 text-sm font-bold text-teal-700 hover:bg-teal-50 cursor-pointer">+ إضافة وصف</button>
        </section>

        <section className="mt-6">
          <div className="procedure-editor overflow-hidden rounded-lg border border-slate-300">
            <div className="bg-slate-100 p-3 text-center font-bold">الأهداف</div>
            {data.objectives.map((objective, index) => <div key={index} className="flex border-t border-slate-200"><span className="flex w-10 shrink-0 items-center justify-center bg-slate-50 text-sm font-bold">{index + 1}</span><input className="min-w-0 flex-1 px-3 py-3 outline-none focus:bg-teal-50" value={objective} onChange={e => updateObjectives(index, e.target.value)} placeholder={`الهدف ${index + 1}`} /><button type="button" aria-label="حذف الهدف" className="px-3 text-slate-400 hover:text-red-600" onClick={() => removeObjectives(index)}><Trash2 size={17}/></button></div>)}
          </div>
          <button type="button" onClick={addObjectives} className="no-print mt-2 rounded-lg border border-teal-700 px-4 py-2 text-sm font-bold text-teal-700 hover:bg-teal-50 cursor-pointer">+ إضافة هدف</button>
        </section>

        <section className="mt-6">
          <h2 className="section-title">الشواهد </h2>
          <div className="rounded-lg border border-dashed border-slate-400 p-4">
            <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={addImages}/>
            <div className="no-print mb-4 flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-50 p-5 text-center">
              <ImagePlus className="text-teal-700" size={32}/><p className="font-bold">أضف صور </p><p className="text-sm text-slate-500">يمكن اختيار أكثر من صورة، وسيتم ترتيبها تلقائياً في نسخة الطباعة.</p>
              <button type="button" onClick={() => inputRef.current?.click()} className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white cursor-pointer">+ إضافة صور</button>
            </div>
            {data.images.length > 0 && <div className="image-editor-grid">{data.images.map(image => <div key={image.id} className="relative overflow-hidden rounded-lg border bg-slate-50"><img src={image.url} alt="شاهد تنفيذ" className="aspect-square w-full object-cover"/><button type="button" onClick={() => removeImage(image.id)} aria-label="حذف الصورة" className="no-print absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 cursor-pointer"><Trash2 size={15}/></button></div>)}</div>}
          </div>
        </section>

        <section className="mt-6">
  <div className="form-table grid-cols-2!">

    {/* الموجه/ة الصحي/ة - Titles */}
    <div className="bg-slate-100 px-2 py-2 text-center text-sm font-bold">
      الموجه/ة الصحي/ة
    </div>

    <div className="bg-slate-100 px-2 py-2 text-center text-sm font-bold">
      مدير/ة المدرسة
    </div>

    {/* الموجه/ة الصحي/ة - Data */}
    <input
      className="px-2 py-3 outline-none focus:bg-teal-50"
      value={data.healthCounselorName}
      onChange={e => update('healthCounselorName', e.target.value)}
      placeholder="التوقيع"
    />

    {/* مدير/ة المدرسة - Titles */}
    

    <input
      className="px-2 py-3 outline-none focus:bg-teal-50"
      value={data.schoolPrincipalName}
      onChange={e => update('schoolPrincipalName', e.target.value)}
      placeholder="التوقيع"
    />

  </div>
</section>
      </div>
    </div>
  )
}
