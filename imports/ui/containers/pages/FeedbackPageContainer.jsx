import { connect } from 'react-redux';

import { feedback } from '/imports/actions/user/feedback';

import { FeedbackPageComponent } from '/imports/ui/components/pages/FeedbackPageComponent';

const mapStateToProps = state => {
  return {
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    feedback: (feedbackAttributes) => {
      dispatch(feedback(feedbackAttributes));
    }
  };
};

export const FeedbackPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackPageComponent);
