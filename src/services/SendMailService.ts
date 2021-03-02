import nodemailer, { Transporter } from 'nodemailer';
import { resolve } from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
class SendMailService {
    private client: Transporter
    constructor() {
        nodemailer.createTestAccount()
            .then(account => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass
                    }
                });
                this.client = transporter;
            })
    }

    public async execute(to: string, subject: string, body: string) {
        const pathsm = resolve(__dirname, '..', 'views', 'emails', 'sendmail.hbs');
        const templateFileContent = fs.readFileSync(pathsm).toString('utf8');
        const mailTemplateParse = handlebars.compile(templateFileContent);

        const html = mailTemplateParse({
            name: to,
            title: subject,
            description: body,
            value: [1,2,3,4,5,6,7,8,9,10]
        })
        const message  = await this.client.sendMail({
            from: '<pires@corporation.com>',
            to,
            html,
            subject,
        });
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default new SendMailService