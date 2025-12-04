'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generateAndSendOtp, verifyOtp } from '@/actions/auth.action';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const RESEND_COOLDOWN = 30;

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const storedTimestamp = localStorage.getItem(`otpCooldown-${email}`);
    if (storedTimestamp) {
      const diff = Math.ceil((Number(storedTimestamp) - Date.now()) / 1000);
      if (diff > 0) setCounter(diff);
    }
  }, [email]);

  useEffect(() => {
    if (counter <= 0) return;

    intervalRef.current = window.setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [counter]);

  const handleVerify = async () => {
    if (code.length !== 4) {
      toast.error('Please enter the 4‑digit code');
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOtp(email, code);
      toast.success('Email verified successfully!');
      if (response.success) {
        setTimeout(() => {
          window.location.replace('/');
        }, 1200);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await generateAndSendOtp(email);
      toast.success('OTP resent successfully!');
      setCounter(RESEND_COOLDOWN);
      localStorage.setItem(
        `otpCooldown-${email}`,
        String(Date.now() + RESEND_COOLDOWN * 1000)
      );
    } catch (err) {
      console.error(err);
      toast.error('Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-foreground p-4">
      <div className="bg-foreground shadow rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-black mb-4 text-center">Verify Email</h1>
        <p className="text-gray-600 text-center mb-6">
          We&apos;ve sent a verification code to <strong>{email}</strong>. To
          complete the verification process, please enter the code below.
        </p>

        <div className="mb-6 flex justify-center">
          <InputOTP
            maxLength={4}
            value={code}
            onChange={(value) => setCode(value)}
            pattern="[0-9]*" // string, not RegExp
            inputMode="numeric" // helps mobile keyboards show numeric keypad
          >
            <InputOTPGroup className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="border border-[#2d298e] text-black w-16 h-16 rounded-md text-center text-xl"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={handleVerify}
          className="w-full mb-4"
          disabled={loading || code.length !== 4}
        >
          {loading ? 'Verifying...' : 'Continue'}
        </Button>

        <Button
          onClick={handleResend}
          className="w-full"
          disabled={counter > 0 || resendLoading}
          variant="secondary"
        >
          {counter > 0
            ? `Resend OTP in ${counter}s`
            : resendLoading
              ? 'Resending...'
              : 'Resend OTP'}
        </Button>
      </div>
    </div>
  );
}
