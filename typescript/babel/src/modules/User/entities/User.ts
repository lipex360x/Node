import { v4 as uuid } from 'uuid'

export default class User {
  public readonly id: string;

  public name: string;
  public email: string;
  public password: string;
  public status?: number;

  constructor (props: Omit<User, 'id'>, id?: string, status?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = uuid()
    }

    if (!status) {
      this.status = 0
    }
  }
}
