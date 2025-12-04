'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  signinSchema,
  signinSchemaType,
  signupSchema,
  signupSchemaType,
} from '@/schema/credential.schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import SocialButton from './social-button';
import Link from 'next/link';
import { signupUser } from '@/actions/auth.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

export function SignInForm() {
  const form = useForm<signinSchemaType>({
    mode: 'all',
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit: SubmitHandler<signinSchemaType> = async (
    data: signinSchemaType
  ) => {
    form.setError('email', {});
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.ok) {
        toast.success(`Welcome back!`);
        setTimeout(() => {
          window.location.replace('/');
        }, 1200);
      }

      if (res?.error) {
        toast.error(res.error);
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="john@example.com"
                  className="h-11 w-full"
                />
              </FormControl>
              <FormMessage className="text-xs text-rose-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  className="h-11 w-full"
                />
              </FormControl>
              <FormMessage className="text-xs text-rose-500" />
            </FormItem>
          )}
        />

        <Button
          onClick={form.handleSubmit(handleSubmit)}
          className="w-full h-12 cursor-pointer text-base font-semibold gap-2"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Signing In...
            </span>
          ) : (
            'Sign In'
          )}
        </Button>

        <div className="flex items-center justify-start gap-2">
          <p className="text-muted-foreground">Don&apos;t have an account?</p>
          <Button
            className="text-[#2d298e] cursor-pointer hover:bg-background text-xl"
            asChild
            variant="ghost"
          >
            <Link href={'/auth/sign-up'}>Sign up</Link>
          </Button>
        </div>
      </div>
    </Form>
  );
}
export function SignUpForm() {
  const form = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      confirmPassword: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit: SubmitHandler<signupSchemaType> = async (data) => {
    await signupUser(data);
    console.log('Sign Up Data: ', data);
  };

  return (
    <div className="flex items-center w-full justify-center flex-col gap-3">
      <Form {...form}>
        <div className="space-y-2 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-xl font-bold dark:text-gray-400 text-gray-500">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    className="h-11  placeholder:text-xl  w-full"
                  />
                </FormControl>
                <FormMessage className="text-xs " />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-xl font-bold dark:text-gray-400 text-gray-500">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="john@example.com"
                    className="h-11  placeholder:text-xl  w-full"
                  />
                </FormControl>
                <FormMessage className="text-xs " />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold dark:text-gray-400 text-gray-500">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    className="h-11  placeholder:text-xl  w-full"
                  />
                </FormControl>
                <FormMessage className="text-xs " />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold dark:text-gray-400 text-gray-500">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    className="h-11  placeholder:text-xl  w-full"
                  />
                </FormControl>
                <FormMessage className="text-xs " />
              </FormItem>
            )}
          />

          <Button
            onClick={form.handleSubmit(handleSubmit)}
            className="w-full rounded-3xl bg-[#2d298e] hover:bg-[#2d298e] text-white h-14 text-base cursor-pointer font-semibold gap-2"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Creating Account...
              </span>
            ) : (
              'Continue'
            )}
          </Button>
          <div className="flex items-center justify-start">
            <p className="text-muted-foreground">Already have an account?</p>
            <Button
              className="text-[#2d298e] text-xl hover:bg-background"
              asChild
              variant={'ghost'}
            >
              <Link href={'/auth/sign-in'}>Login</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            By clicking &apos;Continue&apos;. you acknowledge that you have read
            and accepted our Terms of Service and Privacy Polciy
          </p>
        </div>
      </Form>
    </div>
  );
}

interface AuthProps {
  type: 'signin' | 'signup';
}

export default function CredentialForm({ type }: AuthProps) {
  return (
    <div className="flex-col max-w-5/6 gap-3 w-full flex">
      <SocialButton type={type} />
      {type === 'signup' ? <SignUpForm /> : <SignInForm />}
    </div>
  );
}
