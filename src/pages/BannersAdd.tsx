import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Input } from '../shared/ui/Input';
import { useNavigate } from 'react-router-dom';
import { FileUploadInput } from '../shared/ui/FileUploadInput';
import { instance } from '../shared/api/instance';
import { API_ENDPOINTS } from '../shared/api/endpoints';
import toast from 'react-hot-toast';
import { IAddBannerProps } from '../shared/lib/interfaces';

const BannersAdd = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = React.useState('');
  const [bannerImage, setBannerImage] = React.useState(null as File | null);
  const [bannerLink, setBannerLink] = React.useState('');

  const uploadBannerImage = async (img: File) => {
    const formData = new FormData();
    formData.append('image', img);
    const response = await toast.promise(
      instance.post(API_ENDPOINTS.BANNERS_UPLOAD_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      {
        error: 'Upload image failed',
        loading: 'Uploading image...',
        success: 'Image uploaded successfully',
      },
    );

    if (response.status === 201) {
      setBannerLink(response.data);
    }
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBannerImage(e.target.files[0]);
      uploadBannerImage(e.target.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: IAddBannerProps = {
      image: bannerLink,
      link: inputValue,
    };
    const response = await toast.promise(
      instance.post(API_ENDPOINTS.BANNER_ADD, data),
      {
        error: 'Failed to add banner',
        loading: 'Adding banner...',
        success: 'Banner added successfully',
      },
    );
    if (response.status === 201) {
      navigate('/banners');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add banner" />
      <div className="max-w-[500px]">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Upload banner
            </h3>
          </div>
          <div className="p-7">
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                label="Banner link"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="www.example.com"
              />

              <FileUploadInput onChange={onChangeImage} image={bannerImage} />

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

export default BannersAdd;
