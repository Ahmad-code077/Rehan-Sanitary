'use client';

import React from 'react';
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';

type Props = {
  onUpload: (urls: string[]) => void;
};

export default function CloudinaryUpload({ onUpload }: Props) {
  return (
    <CldUploadButton
      options={{ multiple: true, maxFiles: 5 }}
      onSuccess={(result: CloudinaryUploadWidgetResults) => {
        const urls: string[] = [];

        if (!result?.info) return;

        // Handle multiple files
        if (Array.isArray(result.info)) {
          console.log('resuting multiple', result.info);
          urls.push(
            ...result.info
              .map((file) => {
                if (typeof file === 'object' && 'secure_url' in file) {
                  return file.secure_url;
                }
                return '';
              })
              .filter(Boolean)
          );
        }
        // Handle single file
        else if (
          typeof result.info === 'object' &&
          'secure_url' in result.info
        ) {
          urls.push(result.info.secure_url);
        }

        if (urls.length > 0) {
          onUpload(urls);
        }
      }}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      className={`flex items-center gap-2 border-2 border-default bg-primary text-white  hover:bg-primary/80
        rounded-lg py-2 px-4 `}
    >
      Upload Files
    </CldUploadButton>
  );
}
