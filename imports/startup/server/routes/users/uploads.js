import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { userHasContact } from '/imports/api/collections/users';
import fs from 'fs';


Picker.route('/users/uploads', function (params, req, res) {
//   Required headers
  const userId = req.headers['x-user-id'];
  const loginToken = req.headers['x-login-token'];
  const contactUsername = req.headers['x-contact-username'];
  const fileName = req.headers['x-file-name'];
  const fileType = req.headers['x-file-type'];
  const fileSize = req.headers['x-file-size'];

  if (!userId || !loginToken || !contactUsername) {
    fail(res);
    return false;
  }

  // Connected user
  const user = Meteor.users.findOne({
    _id: userId,
    'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(loginToken)
  }, {
    fields: {
      'profile.contacts': 1
    }
  });
  
  if (!user) {
    fail(res);
    return false;
  }
  
  const contact = Meteor.users.findOne({username: contactUsername}, {fields: {_id: 1}});
  
  if (!contact) {
    fail(res);
    return false;
  }
  
  if(!userHasContact(user, contact._id)){
    fail(res);
    return false;
  }
  
  let data = '';
  
  req.on('data', function (chunk) {
    data += chunk;
  });
  
  
  
//  Write file here
  
  
  
  
  req.on('end', function () {
    fs.writeFile('/Users/shane/Projects/video/public/uploads', data + ".mp4", function(err) {
      if(err) {
        return console.log(err);
      }
    
      console.log("The file was saved!");
      res.end(JSON.stringify({
        success: true
      }))
      
    });

  });
  
});

function fail(res) {
  res.end(JSON.stringify({
    success: false
  }));
}
