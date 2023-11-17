import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

export const IsFile = (validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsFile',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate: (value: any, args: ValidationArguments) => {
          return (
            value &&
            typeof value.name === 'string' &&
            typeof value.size === 'number' &&
            typeof value.mimetype === 'string'
          );
        },
        defaultMessage: (args: ValidationArguments) => {
          return 'File is not valid';
        },
      },
    });
  };
};
