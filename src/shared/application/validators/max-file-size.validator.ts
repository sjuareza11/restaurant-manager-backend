import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

export const MaxFileSize = (maxSize: number, validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'MaxFileSize',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [maxSize],
      options: {
        ...validationOptions,
        message: `File size should be less than ${maxSize} bytes`,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Implement your file size validation logic here
          // For example, you might check that value.size is less than maxSize
          return value.size <= args.constraints[0];
        },
      },
    });
  };
};
