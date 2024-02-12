import { ValidationError } from './validation-error';

export class FieldValidator {
  static validate(value: any, fieldName: string): ValidationBuilder {
    const builder = new ValidationBuilder();
    return builder.validate(value, fieldName);
  }
}

class ValidationBuilder {
  validate(value: any, fieldName: string): ValidationBuilder {
    if (!value) {
      throw new ValidationError(`${fieldName} is missing or invalid.`);
    }

    return this;
  }
}