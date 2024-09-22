import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Input } from '../shared/ui/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../shared/api/instance';
import { API_ENDPOINTS } from '../shared/api/endpoints';
import { IBanner } from '../shared/lib/interfaces';
import { BASE_IMAGE_URL } from '../shared/lib/constants';
import toast from 'react-hot-toast';

const BannerById = () => {
  const navigate = useNavigate();
  const [banner, setBanner] = React.useState(null as IBanner | null);
  const { id } = useParams();

  const onDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await toast.promise(
      instance.delete(`${API_ENDPOINTS.BANNERS}/${id}`),
      {
        error: 'Failed to delete banner',
        loading: 'Deleting banner...',
        success: 'Banner deleted successfully',
      },
    );
    if (response.status === 200) {
      navigate('/banners');
    }
  };

  const getBannerById = async () => {
    const response = await instance.get(`${API_ENDPOINTS.BANNERS}/${id}`);
    const data = response.data as IBanner;
    if (data) {
      setBanner(data);
    }
  };

  React.useEffect(() => {
    getBannerById();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Banner" />
      <div className="max-w-[500px]">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Banner</h3>
          </div>
          <div className="p-7">
            <form onSubmit={onDelete} className="space-y-4">
              <Input
                label="Banner link"
                value={banner?.link || ''}
                className="cursor-default pointer-events-none"
              />

              <img src={BASE_IMAGE_URL + banner?.image} className="shadow-xl" />

              <div className="flex justify-end gap-4.5">
                <button
                  onClick={() => navigate('/banners')}
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-red-500 py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerById;
