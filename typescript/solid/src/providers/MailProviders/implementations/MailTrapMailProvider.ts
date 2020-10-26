import IMailProvider, { ISendMailProps } from '../IMailProvider';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class MailTrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'c95037aa4802d0',
        pass: 'e190ab5efd1f51',
      },
    });
  }
  async sendMail({ to, from, subject, body }: ISendMailProps): Promise<void> {
    this.transporter.sendMail({
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from.name,
        address: from.email,
      },
      subject,
      html: body,
    });
  }
}
