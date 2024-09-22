export interface IAdmin {
  createdAt: string;
  id: string;
  username: string;
}

export interface IAddBannerProps {
  link: string;
  image: string;
}

export interface IBanner {
  createdAt: string;
  id: string;
  image: string;
  link: string;
  type: string;
}

export interface ICity {
  createdAt: string;
  id: number;
  name_ar: string;
  name_en: string;
  name_in: string;
  name_ru: string;
  country: ICountry;
}

export interface ICountry {
  createdAt: string;
  id: number;
  name_ar: string;
  name_en: string;
  name_in: string;
  name_ru: string;
}

export interface ICountryDetails extends ICountry {
  cities: ICity[];
}

export interface IPhoneCode {
  createdAt: string;
  id: string;
  name: string;
}

export interface IPhoneOperator {
  createdAt: string;
  id: string;
  name: string;
}
