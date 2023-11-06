import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
@Injectable()
export class OrganizationsUsersMediator {
  private organizationsSubject = new Subject<string>();
  private usersSubject = new Subject<string>();

  organizations$ = this.organizationsSubject.asObservable();
  users$ = this.usersSubject.asObservable();

  notifyNewOrganization(organizationId: string) {
    this.organizationsSubject.next(organizationId);
  }

  notifyNewUser(userId: string) {
    this.usersSubject.next(userId);
  }
}
