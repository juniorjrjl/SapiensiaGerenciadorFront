import { TestBed, inject } from '@angular/core/testing';

import { GerenciadorapiService } from './gerenciadorapi.service';

describe('GerenciadorapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GerenciadorapiService]
    });
  });

  it('should be created', inject([GerenciadorapiService], (service: GerenciadorapiService) => {
    expect(service).toBeTruthy();
  }));
});
