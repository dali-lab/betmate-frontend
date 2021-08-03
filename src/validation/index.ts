import joi from 'joi';

export const validateSchema = <D>(schema: joi.Schema, data: D, extract = (d: D) => d as any): D => {
  const { error } = schema.validate(extract(data));

  if (error) {
    console.log('validation error', error.message, extract(data));
    throw Error(`Failed to validate: ${error.message}`);
  }

  return data;
};
