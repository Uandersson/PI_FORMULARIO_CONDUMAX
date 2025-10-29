import { TestBed } from '@angular/core/testing';

import { CadernoStorageService } from './caderno-storage.service';

describe('CadernoStorageService', () => {
  let service: CadernoStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadernoStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
