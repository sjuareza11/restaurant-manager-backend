import { OrganizationEntity } from '@organizations/domain/entities/organization.entity';
import { OrganizationRepository } from './organization.repository';
export abstract class DataService {
  abstract organizations: OrganizationRepository<Partial<OrganizationEntity>>;
}
