import { Test, TestingModule } from '@nestjs/testing';
import { DoctorService } from './doctor.service';

describe('DoctorService', () => {
  let service: DoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DoctorService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
