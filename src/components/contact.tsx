
'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { submitContactForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-accent hover:bg-primary/90 text-primary-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Enviar
    </Button>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(submitContactForm, { message: '', success: false });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Oops!',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        form.reset();
      }
    }
  }, [state, toast, form]);

  return (
    <section id="contact" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-4xl px-4">
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold md:text-4xl font-headline">Escribime</CardTitle>
            <CardDescription className="text-muted-foreground pt-2">
              Tenés un proyecto en mente o solo queres saludar? Me encantaria oir de ti.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form name='contacto' action={formAction} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu Nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="tuemail@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Cuentame sobre tu proyecto o duda..." rows={6} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                  <SubmitButton />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
