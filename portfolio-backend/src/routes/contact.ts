import { Router, Request, Response } from 'express';
import { EmbedBuilder } from 'discord.js';
import { sendDM } from '../bot/client';

export const contactRouter = Router();

contactRouter.post('/', async function(req: Request, res: Response): Promise<void> {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Missing fields: name, email, message.' });
    return;
  }

  const embed = new EmbedBuilder()
    .setTitle('📬 Nouveau message de contact')
    .setColor(0x5865F2)
    .addFields(
      { name: 'Nom', value: name },
      { name: 'Email', value: email },
      { name: 'Message', value: message },
    )
    .setTimestamp();

  await sendDM(embed);
  res.status(200).json({ success: true });
});