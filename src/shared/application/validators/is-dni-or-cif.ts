import { CFI_REGEX, DNI_REGEX } from '@src/shared/domain/rules/cif';
import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

export const IsDNIOrCIF = (validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsDNIOrCIF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return DNI_REGEX.test(value) || CFI_REGEX.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'DNI or CIF is not valid';
        },
      },
    });
  };
};
