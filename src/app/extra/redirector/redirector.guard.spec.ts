import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { redirectorGuard } from './redirector.guard';

describe('redirectorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redirectorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
