EmailHelper = class EmailHelper {
    static getHtml (template, values, lang = 'fr') {
        let html = Assets.getText('email/layout.html').replace(
            TemplateHelper.getIncludeRegex('content'),
            Assets.getText(`email/${template}.html`)
        );

        html = TemplateHelper.replaceCommonValues(html, lang);
        html = TemplateHelper.replaceValues(html, values);

        return html;
    }

    static configure () {
        Accounts.emailTemplates.from = Meteor.settings.mail.from;
        Accounts.emailTemplates.siteName = Meteor.settings.mail.siteName;

        EmailHelper.configureVerify();
        EmailHelper.configureReset();
    }

    static configureVerify () {
        // TODO: i18n
        const subject = `Validate your email address on ${Meteor.settings.mail.siteName}`;

        Accounts.emailTemplates.verifyEmail.subject = function () {
            return subject;
        };

        Accounts.emailTemplates.verifyEmail.html = function (user, url) {
            return EmailHelper.getHtml('verify your email', {
                subject,
                username: user.username,
                verifyUrl: EmailHelper.sanitizeUrl(url)
            });
        };
    }

    static configureReset () {
        // TODO: i18n
        const subject = `Reset your password on ${Meteor.settings.mail.siteName}`;

        Accounts.emailTemplates.resetPassword.subject = function () {
            return subject;
        };

        Accounts.emailTemplates.resetPassword.html = function (user, url) {
            return EmailHelper.getHtml('reset', {
                subject,
                username: user.username,
                resetUrl: EmailHelper.sanitizeUrl(url)
            });
        };
    }

    static sanitizeUrl (url) {
        return url.replace('/#/', '/');
    }
};
