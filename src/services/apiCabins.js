import supabase, { supabaseUrl } from './supabase';

export const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('cabins could not be loaded');
  }
  return data;
};

// https://gyveodrmjtapiehapkxu.supabase.co/storage/v1/object/sign/cabin-images/cabin-001.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDAxLmpwZyIsImlhdCI6MTcwMjI0MTM3MSwiZXhwIjoxNzMzNzc3MzcxfQ.CXNOdNYVZSH286QtCsk-SI-AtnJhsae5WgAACwsSMzQ&t=2023-12-10T20%3A49%3A31.670Z
export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  // 1. create cabin/ edit cabin

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // B) EDIT
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select();

  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be added!');
  }

  // 2.upload image.
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3.delete a cabin if there was an error uploading coresponding image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      'Stored image could not be uploaded, cabin was not created!'
    );
  }

  return data;
};
export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be deleted!');
  }
  return data;
};
