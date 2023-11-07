export class StoreCreatedEvent {
  constructor(
    public storeId: string,
    public userId: string,
  ) {}
}
