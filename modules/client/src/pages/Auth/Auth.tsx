import React from 'react';

import AuthForm from './components/AuthForm';

const Auth: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-slate-900 shadow rounded-lg p-6 min-w-[50%]">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
