import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../shared/ui/Input';
import { instance } from '../shared/api/instance';
import { API_ENDPOINTS } from '../shared/api/endpoints';
import toast from 'react-hot-toast';
import { ICity } from '../shared/lib/interfaces';
import { Button } from '../shared/ui/Button';

const CitiesEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputAr, setInputAr] = React.useState('');
  const [inputEn, setInputEn] = React.useState('');
  const [inputIn, setInputIn] = React.useState('');
  const [inputRu, setInputRu] = React.useState('');
  const [cityDetails, setCityDetails] = React.useState(null as ICity | null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name_en: inputEn,
      name_ar: inputAr,
      name_in: inputIn,
      name_ru: inputRu,
      countryId: cityDetails?.country?.id,
    };
    const response = await toast.promise(
      instance.patch(`${API_ENDPOINTS.CITIES}/${id}`, data),
      {
        error: 'Failed to edit city',
        loading: 'Editing city...',
        success: 'City edited successfully',
      },
    );
    if (response.status === 200) {
      navigate(`/cities/country/${id}`);
    }
  };

  const onDelete = async () => {
    const response = await toast.promise(
      instance.delete(`${API_ENDPOINTS.CITIES}/${id}`),
      {
        error: 'Failed to delete city',
        loading: 'Deleting city...',
        success: 'City deleted successfully',
      },
    );
    if (response.status === 200) {
      navigate(`/cities/country/${id}`);
    }
  };

  React.useEffect(() => {
    const getCityById = async () => {
      const response = await instance.get(`${API_ENDPOINTS.CITIES}/${id}`);
      const data = response.data as ICity;
      setCityDetails(data);
      setInputAr(data?.name_ar);
      setInputEn(data?.name_en);
      setInputIn(data?.name_in);
      setInputRu(data?.name_ru);
    };
    getCityById();
  }, []);

  return (
    <>
      <Breadcrumb pageName={`City of ${cityDetails?.country?.name_en}`}>
        <Button path={`/countries/${cityDetails?.country?.id}`}>
          Open country of city
        </Button>
      </Breadcrumb>
      <div className="max-w-[500px]">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Edit city
            </h3>
          </div>
          <div className="p-7">
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                label="Name AR"
                value={inputAr}
                onChange={(e) => setInputAr(e.target.value)}
                placeholder="City name AR"
              />
              <Input
                label="Name En"
                value={inputEn}
                onChange={(e) => setInputEn(e.target.value)}
                placeholder="City name En"
              />
              <Input
                label="Name IN"
                value={inputIn}
                onChange={(e) => setInputIn(e.target.value)}
                placeholder="City name IN"
              />
              <Input
                label="Name RU"
                value={inputRu}
                onChange={(e) => setInputRu(e.target.value)}
                placeholder="City name RU"
              />

              <div className="flex items-center justify-between">
                <div>
                  <button
                    onClick={onDelete}
                    className="flex justify-center rounded bg-red-500 py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex justify-end gap-4.5">
                  <button
                    onClick={() => navigate('/countries')}
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CitiesEdit;
