interface Buttons {
  contact: string;
  submit: string;
  viewPortfolio: string;
}

interface Form {
  select: string;
  service: string;
  servicePlaceholder: string;
  firstName: string;
  firstNamePlaceholder: string;
  lastName: string;
  lastNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  requiredAlert: string;
  emailSent: string;
  emailNotSent: string;
  additionalInfo: string;
  details: string;
  detailsPlaceholder: string;
  referanceImage: string;
  upload: string;
  budget: string;
  currency: string;
}

interface Nav {
  home: string;
  portfolio: string;
  contact: string;
  work: string;
}

interface Other {
  contactInfo: string;
}

export interface Translations {
  buttons: Buttons;
  form: Form;
  nav: Nav;
  other: Other;
}
