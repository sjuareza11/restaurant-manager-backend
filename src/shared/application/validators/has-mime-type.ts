import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export const HasMimeType = (
  mimeTypes: string[],
  validationOptions?: ValidationOptions,
) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'HasMimeType',
      target: object.constructor,
      propertyName: propertyName,
      constraints: mimeTypes,
      options: {
        ...validationOptions,
        message: `File type should be ${mimeTypes}`,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log('sd', value);
          // Implement your mime type validation logic here
          // For example, you might check that mimeTypes includes value.type
          return args.constraints.includes(value.mimetype);
        },
      },
    });
  };
};
