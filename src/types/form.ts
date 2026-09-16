export interface ReportImage {
  id: string
  file: File
  url: string
}

export interface ReportFormData {
  schoolName: string
  healthProgramName: string;
  implementers: string;
  participants: string;
  implementationLocation: string;
  implementationDuration: string;
  implementationDate: string;
  beneficiaries: string;
  beneficiaryCount: string;
  field: string;
  implementationSteps: string[];
  objectives: string[];
  healthCounselorName: string;
  schoolPrincipalName: string;
  images: ReportImage[]

}

export const createInitialForm = (): ReportFormData => ({
  schoolName: '', healthProgramName: '', implementers: '', participants: '', implementationDate: '',
  implementationLocation: '', implementationDuration: '', beneficiaryCount: '' , field: '', implementationSteps: ['', '', ''],
  objectives: ['', '', ''], healthCounselorName: '', schoolPrincipalName: '', images: [], beneficiaries: '',
})