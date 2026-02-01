'use client';

import { SignInForm } from '@/src/modules/auth/components/SignInForm';

export default function SignInPage() {
  const handleSignIn = async (data: { email: string; password: string }) => {
    // TODO: Implement actual authentication logic
    console.log('Sign in attempt:', data.email);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For now, just redirect to home on success
    window.location.href = '/';
  };

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center p-4">
      <SignInForm onSubmit={handleSignIn} />
    </div>
  );
}
