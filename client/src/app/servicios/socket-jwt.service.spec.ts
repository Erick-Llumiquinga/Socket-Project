import { TestBed } from '@angular/core/testing';

import { SocketJwtService } from './socket-jwt.service';

describe('SocketJwtService', () => {
  let service: SocketJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
