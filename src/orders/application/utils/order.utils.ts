export class OrderUtils {
  static genereteOrderNumber(): string {
    return `PK${Date.now()}` + Math.floor(Math.random() * 1000).toString();
  }
}
