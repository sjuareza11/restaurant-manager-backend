export class OrganizationCreatedEvent {
  constructor(
    public organizationId: string,
    public userId: string,
  ) {}
}
