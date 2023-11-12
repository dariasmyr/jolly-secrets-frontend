// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { useRef, useState } from 'react';
import axios from 'axios';

const ImageUploader: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const uploadFileReference = useRef<HTMLInputElement>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setError(null);

      const formData = new FormData();
      formData.append('files', file);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REST_API_URL}/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        const fileUrl = response.data[0].path;
        setImageUrl(fileUrl);
      } catch {
        setError('An error occurred while uploading the image.');
      }
    }
  };

  return (
    <div>
      <input
        ref={uploadFileReference}
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button
        onClick={(): void => {
          if (uploadFileReference.current) {
            uploadFileReference.current.click();
          }
        }}
      >
        Select Image
      </button>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {imageUrl && (
        <div>
          <h2>Uploaded Image</h2>
          <img
            src={process.env.NEXT_PUBLIC_REST_API_URL + imageUrl}
            alt="Uploaded"
            style={{ maxWidth: '50%' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
