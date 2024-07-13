interface Titles {
  services: string;
  values: string;
  process: string;
  features: string;
  inspired: string;
  aboutMe: string;
  work: string;
  contact: string;
  reviews: string;
  blog: string;
}

interface Buttons {
  workWithMe: string;
  view: string;
  contact: string;
  send: string;
}

interface Form {
  name: string;
  email: string;
  companyName: string;
  budget: string;
  message: string;
  sent: string;
}

interface Nav {
  home: string;
  services: string;
  tattoo: string;
  henna: string;
  testTattoo: string;
  courses: string;
  inPerson: string;
  online: string;
  portfolio: string;
  flash: string;
  canvases: string;
  boutique: string;
  contact: string;
  blog: string;
}

interface Other {
  startAt: string;
}

export interface Translations {
  buttons: Buttons;
  blockTitles: Titles;
  form: Form;
  nav: Nav;
  other: Other;
}
