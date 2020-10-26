import { format } from 'date-fns';
import Queue from '../../lib/Queue';
import MailHello from '../jobs/MailHello';
import mongoHello from '../schemas/mongoHello';

class MailHelloController {
  async index(req, res) {
    const object = {
      name: 'User',
      message: 'Hello World',
    };

    // Job Inserido na Fila
    await Queue.add(MailHello.key, { object });

    // Notificação Enviada
    const sendDate = format(new Date(), "dd/MM/yyyy 'às' HH:mm'");
    await mongoHello.create({
      message: `Hello World :) - Email enviado em ${sendDate}`,
    });

    return res.json({ sendMail: true });
  }
}

export default new MailHelloController();
