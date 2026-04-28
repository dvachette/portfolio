import dotenv from 'dotenv';
dotenv.config();

function required(key: string): string {
    const val = process.env[key];
    if (!val) throw new Error(`Missing env variable: ${key}`);
    return val;
};

export const config = {
    port: parseInt(process.env.PORT ?? '3000', 10),
    discord: {
        token: required('DISCORD_TOKEN'),
        userId: required('DISCORD_USER_ID'),
    },
};