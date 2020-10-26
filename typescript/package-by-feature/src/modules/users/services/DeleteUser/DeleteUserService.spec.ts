import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';
import CreateUserService from '../CreateUser/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUserService: DeleteUserService;
let createUserService: CreateUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(fakeUsersRepository);
    deleteUserService = new DeleteUserService(fakeUsersRepository);
  });

  it('shuold able to delete a user', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456',
    });

    const deleteUser = await deleteUserService.execute({
      email: 'john@mail.com',
    });

    expect(deleteUser.status).toEqual(0);
  });

  it('should not able to remove an inexistent user', async () => {
    await expect(
      deleteUserService.execute({
        email: 'john@mail.com',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
