import ValidationError from '../errors/validation_error';

function validate ( payload: any, schema: any ) {
  const { error, value } = schema.validate( payload );

  if ( error ) {
    throw new ValidationError( error.details[0].message );
  }

  return value;
}

export {
  validate
};
