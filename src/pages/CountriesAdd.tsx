import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { Input } from '../shared/ui/Input';
import { instance } from '../shared/api/instance';
import { API_ENDPOINTS } from '../shared/api/endpoints';
import toast from 'react-hot-toast';

const CountriesAdd = () => {
  const navigate = useNavigate();
  const [inputAr, setInputAr] = React.useState('');
  const [inputEn, setInputEn] = React.useState('');
  const [inputIn, setInputIn] = React.useState('');
  const [inputRu, setInputRu] = React.useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name_en: inputEn,
      name_ar: inputAr,
      name_in: inputIn,
      name_ru: inputRu,
    };
    const response = await toast.promise(
      instance.post(API_ENDPOINTS.COUNTRY_ADD, data),
      {
        error: 'Failed to add country',
        loading: 'Adding country...',
        success: 'Country added successfully',
      },
    );
    if (response.status === 201) {
      navigate('/countries');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add country" />
      <div className="max-w-[500px]">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add country
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

              <div className="flex justify-end gap-4.5">
                <button
                  onClick={() => navigate('/banners')}
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountriesAdd;
