import express from 'express';
//import emailjs from '@emailjs/nodejs';
const router = express.Router();

// send email in case of emergency
router.post('/api/email', async (req, res) => {
  const { name, from, to, contacts } = {
    name: 'Tri',
    from: 'hehe',
    to: 'haha',
    contacts: ['thantrongtri93@gmail.com'],
  };
  let sent_anyone = false;
  for (let contact of contacts) {
    emailjs.send(
      'service_nwx8p7m',
      'template_70jcvv6',
      {
        name: 'John',
        from: from,
        to: to,
        to_user: contact,
      },
      {
        publicKey: 'P1HrsVxOKKRMGJrXo',
        blockHeadless: true,
      }
    );
  }
});

export default router;
