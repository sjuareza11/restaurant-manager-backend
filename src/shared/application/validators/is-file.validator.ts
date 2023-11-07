import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export const IsFile = (validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return () => (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsFile',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Implement your file validation logic here
          // For example, you might check that value is an instance of File
          return value instanceof File;
        },
      },
    });
  };
};
