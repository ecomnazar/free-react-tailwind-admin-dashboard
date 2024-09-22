import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../shared/ui/Input';
import { instance } from '../shared/api/instance';
import { API_ENDPOINTS } from '../shared/api/endpoints';
import toast from 'react-hot-toast';
import { ICountryDetails } from '../shared/lib/interfaces';
import { Button } from '../shared/ui/Button';

const CountriesEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputAr, setInputAr] = React.useState('');
  const [inputEn, setInputEn] = React.useState('');
  const [inputIn, setInputIn] = React.useState('');
  const [inputRu, setInputRu] = React.useState('');
  const [countryDetails, setCountryDetails] = React.useState(
    null as ICountryDetails | null,
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name_en: inputEn,
      name_ar: inputAr,
      name_in: inputIn,
      name_ru: inputRu,
    };
    const response = await toast.promise(
      instance.patch(`${API_ENDPOINTS.COUNTRIES}/${id}`, data),
      {
        error: 'Failed to edit country',
        loading: 'Editing country...',
        success: 'Country edited successfully',
      },
    );
    if (response.status === 200) {
      navigate('/countries');
    }
  };

  const onDelete = async () => {
    const response = await toast.promise(
      instance.delete(`${API_ENDPOINTS.COUNTRIES}/${id}`),
      {
        error: 'Failed to delete country',
        loading: 'Deleting country...',
        success: 'Country deleted successfully',
      },
    );
    if (response.status === 200) {
      navigate('/countries');
    }
  };

  React.useEffect(() => {
    const getCountryById = async () => {
      const response = await instance.get(`${API_ENDPOINTS.COUNTRIES}/${id}`);
      const data = response.data as ICountryDetails;
      setCountryDetails(data);
      setInputAr(data?.name_ar);
      setInputEn(data?.name_en);
      setInputIn(data?.name_in);
      setInputRu(data?.name_ru);
    };
    getCountryById();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Edit country">
        <div className="space-x-2">
          <Button path={`/cities/country/${id}`}>Cities of country</Button>
          <Button path={`/phoneCodes/add/${id}`}>Add Phone Code</Button>
          <Button path={`/phoneOperators/add/${id}`}>Add Phone Operator</Button>
        </div>
      </Breadcrumb>
      <div className="max-w-[500px]">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Edit country
            </h3>
          </div>
          <div className="p-7">
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                label="Name AR"
                value={inputAr}
                onChange={(e) => setInputAr(e.target.value)}
                placeholder="Country name AR"
              />
              <Input
                label="Name En"
                value={inputEn}
                onChange={(e) => setInputEn(e.target.value)}
                placeholder="Country name En"
              />
              <Input
                label="Name IN"
                value={inputIn}
                onChange={(e) => setInputIn(e.target.value)}
                placeholder="Country name IN"
              />
              <Input
                label="Name RU"
                value={inputRu}
                onChange={(e) => setInputRu(e.target.value)}
                placeholder="Country name RU"
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

export default CountriesEdit;
