import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { API_ENDPOINTS } from '../shared/api/endpoints';
import { instance } from '../shared/api/instance';
import { Column, Table } from '../shared/ui/Table';
import { Button } from '../shared/ui/Button';
import { IBanner } from '../shared/lib/interfaces';
import { BASE_IMAGE_URL } from '../shared/lib/constants';
import { useNavigate } from 'react-router-dom';

const ROWS = ['Banner image', 'Link'];

const Banners = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = React.useState<IBanner[]>([]);
  const getBanners = async () => {
    const response = await instance.get(API_ENDPOINTS.BANNERS);
    if (response.data) {
      setBanners(response.data.banners);
    }
  };

  React.useEffect(() => {
    getBanners();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Banners">
        <Button path="/banners/add">Add Banner</Button>
      </Breadcrumb>
      <Table title="Banners" rows={ROWS}>
        {banners?.map((banner) => {
          return (
            <Table.Row
              onClick={() => navigate(`/banners/${banner.id}`)}
              key={banner.id}
            >
              <Column colSpan={3}>
                <img
                  src={BASE_IMAGE_URL + banner.image}
                  className="w-[200px] h-[125px] bg-cover rounded-md bg-center shadow-2xl"
                />
              </Column>
              <Column colSpan={2}>{banner.link}</Column>
            </Table.Row>
          );
        })}
      </Table>
    </>
  );
};

export default Banners;
