export type Patient = {
  _id: string;
  firstName: string;
  lastName: string;
  tcNo: string;
};

export type Laborant = {
  _id: string;
  firstName: string;
  lastName: string;
};

export type Report = {
  _id: string;
  fileNumber: string;
  diagnosisTitle: string;
  diagnosisDetails: string;
  reportDate: Date;
  patient: Patient;
  laborant: Laborant;
};
