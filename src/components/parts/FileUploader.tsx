import { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

import { convertFileToUrl } from '@/lib/utils';
import { FileUploaderTypes } from '@/types';
import { Button } from '../ui/button';

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderTypes) => {
  console.log(mediaUrl);
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
  // console.log(fileUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
  });
  return (
    <div
      {...getRootProps()}
      className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input
        {...getInputProps()}
        className='cursor-pointer'
      />
      {fileUrl ? (
        <>
          <div className='flex flex-1 justify-center items-center w-full lg:p-10'>
            <img
              src={fileUrl}
              alt='image'
              className='h-80 lg:h-[480px] w-full rounded-[24px] object-cover object-top'
            />
          </div>
          <p className='text-center'>Click or drag photo to replace</p>
        </>
      ) : (
        <div className='rounded-lg bg-[#282828c1] flex flex-center items-center justify-center flex-col p-7 h-80 '>
          <img
            src='/assets/icons/upload.svg'
            width={96}
            height={77}
            alt='file upload'
          />

          <h3 className='base-medium text-light-2 mb-2 mt-6 inline-block'>
            Drag photo here
          </h3>
          <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>

          <Button
            type='button'
            className='bg-[#0f172a]'>
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
