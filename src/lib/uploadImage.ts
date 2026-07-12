export const uploadImage = async (file: File): Promise<string | undefined> => {
  if (!file) {
    return;
  }
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    console.error('ImgBB API key is missing. Set NEXT_PUBLIC_IMGBB_API_KEY in .env');
    return '';
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('ImgBB upload response not OK');
    }

    const resData = await res.json();
    return resData?.data?.url;
  } catch (error) {
    console.error('image upload failed', error);
    return;
  }
};
