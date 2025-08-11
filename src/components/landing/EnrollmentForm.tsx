"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
});

type EnrollmentFormValues = z.infer<typeof formSchema>;

const SCRIPT_URL = "https://lwvijcdvemceqynquaoa.supabase.co/functions/v1/submit-form";

export const EnrollmentForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: EnrollmentFormValues) => {
    setIsSubmitting(true);
    try {
      // Call the Supabase Edge Function instead of Google Script directly
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Check for errors from the Edge Function or Google Script
      if (!response.ok || result.result !== "success") {
        throw new Error(result.message || result.error || "Submission failed.");
      }

      toast.success("Thank you for your interest! We will be in touch shortly.");
      onSuccess?.();
      form.reset();
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="(123) 456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </Form>
  );
};