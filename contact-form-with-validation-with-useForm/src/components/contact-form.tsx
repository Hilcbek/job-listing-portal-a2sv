import { contactSchema, type contactSchemaType } from '@/schema/contact.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { IconBrandTelegram } from '@tabler/icons-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { toast } from 'sonner';

export default function ContactForm() {
  const form = useForm<contactSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const handleSubmit: SubmitHandler<contactSchemaType> = async (
    data: contactSchemaType
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('Message sent successfully!');
      console.log(data);

      form.reset({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="h-[90vh] w-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl animate-in fade-in duration-700">
        <div className="text-center mb-8 space-y-2 animate-in slide-in-from-top duration-500">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Have a question? We'd love to hear from you.
          </p>
        </div>

        <div className="rounded-2xl border bg-card text-card-foreground shadow-lg p-6 sm:p-8 lg:p-10 animate-in slide-in-from-bottom duration-700">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-left duration-500 delay-100">
                    <FormLabel className="text-sm font-semibold">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        className="h-11 transition-all focus:scale-[1.01]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs animate-in fade-in slide-in-from-top duration-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-left duration-500 delay-200">
                    <FormLabel className="text-sm font-semibold">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="john@example.com"
                        className="h-11 transition-all focus:scale-[1.01]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs animate-in fade-in slide-in-from-top duration-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-left duration-500 delay-300">
                    <FormLabel className="text-sm font-semibold">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us what you're thinking..."
                        className="min-h-[140px] resize-none transition-all focus:scale-[1.01]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs animate-in fade-in slide-in-from-top duration-300" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold gap-2 transition-all hover:gap-3 hover:scale-[1.02] active:scale-[0.98] animate-in fade-in slide-in-from-bottom duration-500 delay-500"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <IconBrandTelegram
                      size={20}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6 animate-in fade-in duration-700 delay-700">
          Hope done as you said!
        </p>
      </div>
    </div>
  );
}
