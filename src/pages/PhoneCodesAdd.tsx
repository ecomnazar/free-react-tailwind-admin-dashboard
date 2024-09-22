import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../shared/ui/Input';
import { instance } from '../shared/api/instance';
import { API_ENDPOINTS } from '../shared/api/endpoints';
import toast from 'react-hot-toast';

const PhoneCodesAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputValue, setInputValue] = React.useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: inputValue,
      countryId: id,
    };
    const response = await toast.promise(
      instance.post(API_ENDPOINTS.PHONE_CODES_ADD, data),
      {
        error: 'Failed to add phone code',
        loading: 'Adding phone code...',
        success: 'Phone code added successfully',
      },
    );
    if (response.status === 201) {
      navigate('/phoneCodes');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add phone code" />
      <div className="max-w-[500px]">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add phone code
            </h3>
          </div>
          <div className="p-7">
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                label="Name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Phone code"
              />
              <div className="flex justify-end gap-4.5">
                <button
                  onClick={() => navigate(-1)}
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

export default PhoneCodesAdd;
