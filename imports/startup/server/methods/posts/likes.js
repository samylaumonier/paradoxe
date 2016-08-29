import { Posts } from '/imports/api/collections/posts';
import { userHasContact } from '/imports/api/collections/users';

Meteor.methods({
  likePost: function (postId) {
    var user = Meteor.user();
    var post = Posts.findOne(postId);
    
    if (!user) {
      throw new Meteor.Error('400', 'User not found');
    }
    
    if (!post) {
      throw new Meteor.Error('400', 'Post does not exist');
    }
    
    if(post.userId != user._id){
      if(!userHasContact(user, post.userId)){
        throw new Meteor.Error('401', 'User is not your contact');
      }
    }
    
    if (post.likers.includes(user._id)) {
      Posts.update(post._id, {
        $pull: {
          likers: user._id,
        },
        $inc: {
          likes: -1
        }
      });
    } else {
      Posts.update(post._id, {
        $push: {
          likers: user._id,
        },
        $inc: {
          likes: 1
        }
      });
    }
  }
});

