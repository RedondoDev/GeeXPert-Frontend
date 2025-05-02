import { TestBed } from '@angular/core/testing';

import { UserGameService } from './user-game.service';

describe('UserGameService', () => {
  let service: UserGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
