export class TemplateHelper {
    static getIncludeRegex (input) {
        return TemplateHelper.getHelperRegex(`> ${input}`);
    }

    static getHelperRegex (input) {
        return new RegExp(`{{${input}}}`, 'g');
    }

    static render (template, values) {
        return TemplateHelper.replaceValues(Assets.getText(template), values);
    }

    static replaceCommonValues (result, lang) {
//        result = result.replace(new RegExp('{{_ \'([a-z0-9-_\.]+)\'}}', 'ig'), (match, key) => {
//            return TAPi18n.__(key, {}, lang);
//        });

        return TemplateHelper.replaceValues(result, {
            siteName: Meteor.settings.mail.siteName,
            domainName: Meteor.settings.mail.domainName,
            siteUrl: Meteor.absoluteUrl(),
//            siteUrl: Meteor.settings.env.ROOT_URL,
//            siteUrl:  "http://localhost:3000/",
            privacyUrl: Meteor.absoluteUrl('privacy'),
            termsUrl: Meteor.absoluteUrl('terms-of-service')
        });
    }

    static replaceValues (result, values) {
        _.each(values, (value, key) => {
            result = result.replace(TemplateHelper.getHelperRegex(key), value);
        });

        return result;
    }
}
