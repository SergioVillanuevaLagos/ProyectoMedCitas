import { Test, TestingModule } from '@nestjs/testing';
import { PacienteController } from './paciente.controller';
import { PacienteService } from './paciente.service';

describe('PacienteController', () => {
  let controller: PacienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacienteController],
      providers: [
        {
          provide: PacienteService,
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

    controller = module.get<PacienteController>(PacienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
