import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import { Login } from './pages/Login';
import Dashboard from './pages/Dashboard';
import Banners from './pages/Banners';
import BannersAdd from './pages/BannersAdd';
import Users from './pages/Users';
import BannerById from './pages/BannerById';
import Countries from './pages/Countries';
import CountriesAdd from './pages/CountriesAdd';
import CountriesEdit from './pages/CountryEdit';
import Cities from './pages/Cities';
import CitiesEdit from './pages/CitiesEdit';
import CitiesOfCountry from './pages/CitiesOfCountry';
import CitiesAdd from './pages/CitiesAdd';
import PhoneCodes from './pages/PhoneCodes';
import PhoneCodesAdd from './pages/PhoneCodesAdd';
import PhoneCodesEdit from './pages/PhoneCodesEdit';
import PhoneOperators from './pages/PhoneOperators';
import PhoneOperatorsAdd from './pages/PhoneOperatorsAdd';
import PhoneOperatorsEdit from './pages/PhoneOperatorsEdit';

function App() {
  const [loading] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <>
            <PageTitle title="Dashboard | Raqam" />
            <DefaultLayout>
              <Dashboard />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/banners"
        element={
          <>
            <PageTitle title="Banners | Raqam" />
            <DefaultLayout>
              <Banners />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/banners/add"
        element={
          <>
            <PageTitle title="Banners add | Raqam" />
            <DefaultLayout>
              <BannersAdd />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/banners/:id"
        element={
          <>
            <PageTitle title="Banner | Raqam" />
            <DefaultLayout>
              <BannerById />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/countries"
        element={
          <>
            <PageTitle title="Countries | Raqam" />
            <DefaultLayout>
              <Countries />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/countries/add"
        element={
          <>
            <PageTitle title="Add country | Raqam" />
            <DefaultLayout>
              <CountriesAdd />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/countries/:id"
        element={
          <>
            <PageTitle title="Edit country | Raqam" />
            <DefaultLayout>
              <CountriesEdit />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/cities"
        element={
          <>
            <PageTitle title="Cities | Raqam" />
            <DefaultLayout>
              <Cities />
            </DefaultLayout>
          </>
        }
      />
      <Route
        // country id
        path="/cities/add/:id"
        element={
          <>
            <PageTitle title="Add city | Raqam" />
            <DefaultLayout>
              <CitiesAdd />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/cities/:id"
        element={
          <>
            <PageTitle title="City | Raqam" />
            <DefaultLayout>
              <CitiesEdit />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/cities/country/:id"
        element={
          <>
            <PageTitle title="Cities | Raqam" />
            <DefaultLayout>
              <CitiesOfCountry />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/phoneCodes"
        element={
          <>
            <PageTitle title="Phone codes | Raqam" />
            <DefaultLayout>
              <PhoneCodes />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/phoneCodes/add/:id"
        element={
          <>
            <PageTitle title="Add phone code | Raqam" />
            <DefaultLayout>
              <PhoneCodesAdd />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/phoneCodes/:id"
        element={
          <>
            <PageTitle title="Edit phone code | Raqam" />
            <DefaultLayout>
              <PhoneCodesEdit />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/phoneOperators"
        element={
          <>
            <PageTitle title="Phone operators | Raqam" />
            <DefaultLayout>
              <PhoneOperators />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/phoneOperators/:id"
        element={
          <>
            <PageTitle title="Edit phone operator | Raqam" />
            <DefaultLayout>
              <PhoneOperatorsEdit />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/phoneOperators/add/:id"
        element={
          <>
            <PageTitle title="Add phone operator | Raqam" />
            <DefaultLayout>
              <PhoneOperatorsAdd />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/users"
        element={
          <>
            <PageTitle title="Users | Raqam" />
            <DefaultLayout>
              <Users />
            </DefaultLayout>
          </>
        }
      />
    </Routes>
  );
}

export default App;
