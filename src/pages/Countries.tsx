import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { API_ENDPOINTS } from '../shared/api/endpoints';
import { instance } from '../shared/api/instance';
import { Column, Table } from '../shared/ui/Table';
import { Button } from '../shared/ui/Button';
import { ICountry } from '../shared/lib/interfaces';
import { useNavigate } from 'react-router-dom';

const ROWS = ['ID', 'Name AR', 'Name EN', 'Name IN', 'Name RU'];

const Countries = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = React.useState<ICountry[]>([]);

  const getCountries = async () => {
    const response = await instance.get(API_ENDPOINTS.COUNTRIES);
    if (response.data) {
      setCountries(response.data);
    }
  };

  React.useEffect(() => {
    getCountries();
  }, []);

  console.log(countries);

  return (
    <>
      <Breadcrumb pageName="Countries">
        <Button path="/countries/add">Add Country</Button>
      </Breadcrumb>
      <Table
        title="Countries"
        rows={ROWS}
        colspan={1}
        enableJustifyBetween={true}
      >
        {countries?.map((country) => {
          return (
            <Table.Row
              onClick={() => navigate(`/countries/${country.id}`)}
              key={country.id}
              enableJustifyBetween={true}
            >
              <Column className="w-[20%]">{country.id}</Column>
              <Column className="w-[20%]">{country.name_ar}</Column>
              <Column className="w-[20%]">{country.name_en}</Column>
              <Column className="w-[20%]">{country.name_in}</Column>
              <Column className="w-[20%]">{country.name_ru}</Column>
            </Table.Row>
          );
        })}
      </Table>
    </>
  );
};

export default Countries;
