export interface IAdressProps {
  email: string;
  name: string;
}

export interface ISendMailProps {
  to: IAdressProps;
  from: IAdressProps;
  subject: string;
  body: string;
}

export default interface IMailProvider {
  sendMail(props: ISendMailProps): Promise<void>;
}
