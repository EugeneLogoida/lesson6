import { TestBed } from '@angular/core/testing';

import { BlogsAndUsersService } from './blogs-and-users.service';

describe('BlogsAndUsersService', () => {
  let service: BlogsAndUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogsAndUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
