/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoggingIntercepterService } from './logging-intercepter.service';

describe('Service: LoggingIntercepter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggingIntercepterService]
    });
  });

  it('should ...', inject([LoggingIntercepterService], (service: LoggingIntercepterService) => {
    expect(service).toBeTruthy();
  }));
});
