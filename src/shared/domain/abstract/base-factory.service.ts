export abstract class BaseFactoryService<T, U> {
  abstract create(data: T): U;
}
