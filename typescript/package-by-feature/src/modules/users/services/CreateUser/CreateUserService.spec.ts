import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(fakeUsersRepository);
  });

  it('should able to create a new user', async () => {
    const newUser = await createUserService.execute({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456',
    });

    expect(newUser).toHaveProperty('id');
  });

  it('should not able to create a new user with email already exists', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
