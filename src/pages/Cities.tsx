import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { API_ENDPOINTS } from '../shared/api/endpoints';
import { instance } from '../shared/api/instance';
import { Column, Table } from '../shared/ui/Table';
import { ICity } from '../shared/lib/interfaces';
import { useNavigate } from 'react-router-dom';
import { Button } from '../shared/ui/Button';

const ROWS = ['ID', 'Name AR', 'Name EN', 'Name IN', 'Name RU'];

const Cities = () => {
  const navigate = useNavigate();
  const [cities, setCities] = React.useState<ICity[]>([]);

  const getCities = async () => {
    const response = await instance.get(API_ENDPOINTS.CITIES);
    if (response.data) {
      setCities(response.data);
    }
  };

  React.useEffect(() => {
    getCities();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Cities" />
      <Table title="Cities" rows={ROWS} enableJustifyBetween={true}>
        {cities?.map((city) => {
          return (
            <Table.Row
              enableJustifyBetween={true}
              onClick={() => navigate(`/cities/${city.id}`)}
              key={city.id}
            >
              <Column className="!w-[25%] !text-left">{city.id}</Column>
              <Column className="!w-[25%] !text-left">
                <h3>{city.country.name_ar}</h3>
                <br />
                <h3>{city.name_ar}</h3>
              </Column>
              <Column className="!w-[25%] !text-left">
                <h3>{city.country.name_en}</h3>
                <h3>{city.name_en}</h3>
              </Column>
              <Column className="!w-[25%] !text-left">
                <h3>{city.country.name_in}</h3>
                <h3>{city.name_in}</h3>
              </Column>
              <Column className="!w-[25%] !text-left">
                <h3>{city.country.name_ru}</h3>
                <h3>{city.name_ru}</h3>
              </Column>
            </Table.Row>
          );
        })}
      </Table>
    </>
  );
};

export default Cities;
