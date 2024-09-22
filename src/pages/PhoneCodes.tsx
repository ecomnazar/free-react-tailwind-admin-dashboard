import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { API_ENDPOINTS } from '../shared/api/endpoints';
import { instance } from '../shared/api/instance';
import { Column, Table } from '../shared/ui/Table';
import { IPhoneCode } from '../shared/lib/interfaces';
import { useNavigate } from 'react-router-dom';

const ROWS = ['ID', 'Name'];

const PhoneCodes = () => {
  const navigate = useNavigate();
  const [phoneCodes, setPhoneCodes] = React.useState<IPhoneCode[]>([]);

  const getPhoneCodes = async () => {
    const response = await instance.get(API_ENDPOINTS.PHONE_CODES);
    const data = response.data.phone_codes;

    if (data) {
      setPhoneCodes(data);
    }
  };

  React.useEffect(() => {
    getPhoneCodes();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Phone codes" />
      <Table title="Phone codes" rows={ROWS}>
        {phoneCodes?.map((phoneCode) => {
          return (
            <Table.Row
              onClick={() => navigate(`/phoneCodes/${phoneCode.id}`)}
              key={phoneCode.id}
            >
              <Column colSpan={3}>{phoneCode.id}</Column>
              <Column colSpan={2}>{phoneCode.name}</Column>
            </Table.Row>
          );
        })}
      </Table>
    </>
  );
};

export default PhoneCodes;
