export interface BaseFormData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AddressFormData extends BaseFormData {
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  country: string;
  state: string;
  city: string;
  delivery: string;
  message: string;
}

export interface FlashFormData extends BaseFormData {
  selectedFlash: string;
  bodyPosition: string;
  availabilities: string;
  additionalComments: string;
}

export interface EncodedFileType {
  name: string;
  type: string;
  data: string;
}
export interface ContactFormData extends BaseFormData {
  service: string;
  plan: string;
  availabilities: string;
  info: string;
  width: string;
  length: string;
  uploads: EncodedFileType[];
}

export interface ApproxFormData extends BaseFormData {
  info: string;
  width: string;
  length: string;
  uploads: EncodedFileType[];
}

export interface FormErrorData {
  [key: string]: boolean;
}

export interface StepProps {
  number: number;
}
