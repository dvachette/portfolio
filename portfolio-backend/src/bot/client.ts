import { Client, EmbedBuilder } from 'discord.js';
import { config } from '../config';

const client = new Client({ intents: [] });

export async function initBot(): Promise<void> {
  await client.login(config.discord.token);
}

export async function sendDM(embed: EmbedBuilder): Promise<void> {
  const user = await client.users.fetch(config.discord.userId);
  await user.send({ embeds: [embed] });
}