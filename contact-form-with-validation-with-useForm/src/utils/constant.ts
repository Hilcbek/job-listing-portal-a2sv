export const contactMessages = {
  name: {
    required: 'Please provide your name.',
    min: 'Your name must contain at least 3 characters.',
    max: 'Your name may not exceed 20 characters.',
  },
  email: {
    required: 'Please provide your email address.',
    valid: 'The email address entered is not valid.',
    mustContain: "The email address must include the '@' symbol.",
  },
  message: {
    required: 'Please enter your message.',
    max: 'Your message cannot exceed 100 characters.',
  },
};
