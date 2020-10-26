import Mail from '../../lib/Mail';

class HelloMail {
  get key() {
    return 'HelloMail';
  }

  async handle({ data }) {
    const { object } = data;
    // console.log(data);

    await Mail.sendMail({
      to: `noreply <noreply@noreply.com>`,
      subject: 'Hello World Mail',
      template: 'mailHello',
      context: {
        name: object.name,
        message: object.message,
      },
    });
  }
}

export default new HelloMail();
