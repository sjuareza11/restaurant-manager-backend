import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataService } from '@organizations/domain/abstract/data-service';
import { OrganizationRepository } from '@organizations/domain/abstract/organization.repository';
import { Model } from 'mongoose';
import { MongoOrganizationRepository } from './repositories/mongo-organization.repository';
import { Organization } from './schemas/organization.schema';

@Injectable()
export class MongoDataService implements DataService {
  organizations: OrganizationRepository<Organization>;

  constructor(
    @InjectModel(Organization.name)
    private OrganizationRepository: Model<Organization>,
  ) {}

  onApplicationBootstrap() {
    this.organizations = new MongoOrganizationRepository<Organization>(this.OrganizationRepository);
  }
}
