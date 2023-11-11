export class OrderUtils {
  static genereteOrderNumber(): string {
    return Date.now() + Math.random().toString();
  }
}
