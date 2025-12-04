import React from 'react';
import CredentialForm from '../credentialForm';

export default function SignIn() {
  return (
    <div className="w-full h-[90%] bg-background/50 flex items-center justify-center">
      <div className="max-w-2xl bg-background/80 p-6 gap-5 flex-col flex items-center justify-center rounded-md shadow-md w-full">
        <h1 className="text-4xl font-black">Welcome Back</h1>
        <CredentialForm type="signin" />
      </div>
    </div>
  );
}
