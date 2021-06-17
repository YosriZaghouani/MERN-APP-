import React, {useState} from 'react';

export default function Form() {
  const [state, setState] = useState({
    feedback: '',
    name: 'Molka',
    email: 'zaghouani.yosri@gmail.com',
  });
  const sendFeedback = (templateId, variables) => {
    window.emailjs
      .send('service_0ec1exm', templateId, variables)
      .then(res => {
        console.log('Email successfully sent!');
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err =>
        console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
      );
  };

  const handleChange = event => {
    setState({...state, feedback: event.target.value});
  };

  const handleSubmit = () => {
    const templateId = 'template_gtm0fyd';

    sendFeedback(templateId, {
      message_html: state.feedback,
      from_name: state.name,
      reply_to: state.email,
    });
  };

  return (
    <form className="test-mailing">
      <h1>Let's see if it works</h1>
      <div>
        <textarea
          id="test-mailing"
          name="test-mailing"
          onChange={e => handleChange(e)}
          placeholder="Post some lorem ipsum here"
          required
          value={state.feedback}
          style={{width: '100%', height: '150px'}}
        />
      </div>
      <input type="button" value="Submit" className="btn btn--submit" onClick={handleSubmit()} />
    </form>
  );
}
