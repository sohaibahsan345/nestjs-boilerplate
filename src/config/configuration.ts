export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    atSecret: process.env.AT_SECRET,
    rtSecret: process.env.RT_SECRET,
    atTTL: process.env.AT_TTL,
    rtTTL: process.env.RT_TTL,
    mongoConnectionString: process.env.MONGO_URI,
    mailHost: process.env.MAIL_HOST,
    mailPort: parseInt(process.env.MAIL_PORT),
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
    mailFrom: process.env.MAIL_FROM
});