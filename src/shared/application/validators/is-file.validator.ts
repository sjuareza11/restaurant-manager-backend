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
            value.data instanceof Buffer &&
            typeof value.size === 'number' &&
            typeof value.encoding === 'string' &&
            typeof value.tempFilePath === 'string' &&
            typeof value.truncated === 'boolean' &&
            typeof value.mimetype === 'string' &&
            typeof value.md5 === 'string'
          );
        },
        defaultMessage: (args: ValidationArguments) => {
          return 'File is not valid';
        },
      },
    });
  };
};
