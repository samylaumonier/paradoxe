import { EmailHelper } from '/imports/startup/server/helpers/email/email';

/** @namespace Meteor.settings.mail */
const s = Meteor.settings.mail;

s.username = encodeURIComponent(s.username);
s.password = encodeURIComponent(s.password);
s.server = encodeURIComponent(s.server);

/** @namespace process.env */
process.env.MAIL_URL = `${s.protocol}://${s.username}:${s.password}@${s.server}:${s.port}`;

// Accounts emails
EmailHelper.configure();
