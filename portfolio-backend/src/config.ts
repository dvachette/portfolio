import dotenv from 'dotenv';
import path from 'path'
dotenv.config();

function required(key: string): string {
    const val = process.env[key];
    if (!val) throw new Error(`Missing env variable: ${key}`);
    return val;
};

// Shared secret used by the admin panel to call the /admin routes (see README)
function adminApiToken(): string | null {
    const token = process.env.ADMIN_API_TOKEN;
    if (!token) {
        console.warn('ADMIN_API_TOKEN is not set: the admin API is disabled.');
        return null;
    }
    if (token.length < 32) throw new Error('ADMIN_API_TOKEN must be at least 32 characters long');
    return token;
}

export const config = {
    port: parseInt(process.env.PORT ?? '3000', 10),
    discord: {
        token: required('DISCORD_TOKEN'),
        userId: required('DISCORD_USER_ID'),
    },
    dataDir: process.env.DATA_DIR ?? path.resolve(__dirname, '..', 'data'),
    adminApiToken: adminApiToken(),
};