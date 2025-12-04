import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Hr,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface VerifyOtpProps {
  userName: string;
  otp: string;
  timestamp: string;
}

export default function VerifyOtpTemplate({
  userName = 'Applicant',
  otp = '1234',
  timestamp = new Date().toLocaleString(),
}: VerifyOtpProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4">
            <Container className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-xl">
              {/* Header */}
              <div className="text-center mb-6">
                <Heading className="text-3xl font-bold text-gray-900 m-0 mb-2">
                  💼 Job Portal
                </Heading>
                <Text className="text-gray-500 text-sm m-0">
                  Your Future Starts Here
                </Text>
              </div>

              <Hr className="border-gray-200 my-6" />

              {/* Main Heading */}
              <Heading className="text-2xl font-semibold text-gray-900 mb-4">
                Email Verification Code
              </Heading>

              {userName && (
                <Text className="text-gray-700 text-base leading-relaxed mb-4">
                  Hi <strong>{userName}</strong>,
                </Text>
              )}

              <Text className="text-gray-700 text-base leading-relaxed mb-6">
                Please use the verification code below to complete your
                registration on the Job Portal.
              </Text>

              {/* OTP Display */}
              <Container className="bg-gray-100 border border-gray-300 p-6 rounded-lg text-center mb-6">
                <Text className="text-4xl tracking-widest font-bold text-gray-900 m-0">
                  {otp}
                </Text>
              </Container>

              <Text className="text-gray-500 text-sm leading-relaxed mb-6 text-center">
                Enter this code on the verification page. This code is valid for{' '}
                <strong>5 minutes</strong>.
              </Text>

              {/* Info Box */}
              <Container className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
                <Text className="text-gray-700 text-sm m-0 mb-2">
                  <strong>Generated at:</strong> {timestamp}
                </Text>
                <Text className="text-gray-700 text-sm m-0">
                  <strong>Code Expires:</strong> In 5 minutes
                </Text>
              </Container>

              {/* Security Notice */}
              <Container className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded mb-6">
                <Text className="text-amber-800 text-sm m-0">
                  ⚠️ <strong>Didn&apos;t request this?</strong>
                  If you didn’t sign up on Job Portal, you can safely ignore
                  this email.
                </Text>
              </Container>

              <Hr className="border-gray-200 my-6" />

              {/* Footer */}
              <Text className="text-gray-500 text-xs text-center m-0">
                © {new Date().getFullYear()} Job Portal. All rights reserved.
              </Text>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
