import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { API_ENDPOINTS } from '../shared/api/endpoints';
import { instance } from '../shared/api/instance';
import { Column, Table } from '../shared/ui/Table';
import { IPhoneOperator } from '../shared/lib/interfaces';
import { useNavigate } from 'react-router-dom';

const ROWS = ['ID', 'Name'];

const PhoneOperators = () => {
  const navigate = useNavigate();
  const [phoneOperators, setPhoneOperators] = React.useState<IPhoneOperator[]>(
    [],
  );

  const getPhoneOperators = async () => {
    const response = await instance.get(API_ENDPOINTS.PHONE_OPERATORS);
    const data = response?.data?.operator;

    if (data) {
      setPhoneOperators(data);
    }
  };

  React.useEffect(() => {
    getPhoneOperators();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Phone operators" />
      <Table title="Phone operators" rows={ROWS}>
        {phoneOperators?.map((phoneOperator) => {
          return (
            <Table.Row
              onClick={() => navigate(`/phoneOperators/${phoneOperator.id}`)}
              key={phoneOperator.id}
            >
              <Column colSpan={3}>{phoneOperator.id}</Column>
              <Column colSpan={2}>{phoneOperator.name}</Column>
            </Table.Row>
          );
        })}
      </Table>
    </>
  );
};

export default PhoneOperators;
