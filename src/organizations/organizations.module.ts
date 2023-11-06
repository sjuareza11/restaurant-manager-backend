import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsService } from './application/organizations.service';
import { OrganizationsController } from './controllers/organizations.controller';
import { DataService } from './domain/abstract/data-service';
import { MongoDataService } from './infraestructure/database/mongo-db/mongo-data.service';
import {
  Organization,
  OrganizationSchema,
} from './infraestructure/database/mongo-db/schemas/organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
  controllers: [OrganizationsController],
  providers: [
    OrganizationsService,
    {
      provide: DataService,
      useClass: MongoDataService,
    },
  ],
})
export class OrganizationsModule {}
