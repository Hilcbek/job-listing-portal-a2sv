import React from 'react';
import CredentialForm from '../credentialForm';

export default function SignUpPage() {
  return (
    <div className="w-full h-[90%] bg-background/60 flex items-center justify-center">
      <div className="max-w-2xl bg-background/60 p-6 gap-5 flex-col flex items-center justify-center rounded-md shadow-md w-full">
        <h1 className="text-4xl font-black">Sign Up Today!</h1>
        <div className="flex items-center max-w-5/6 w-full gap-3 justify-center">
          <span className="w-full border"></span>
          <span className="text-md text-gray-500 dark:text-gray-400 w-full text-center">
            Or Sign Up with Email
          </span>
          <span className="w-full border"></span>
        </div>
        <CredentialForm type="signup" />
      </div>
    </div>
  );
}
