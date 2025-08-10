"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Trash2, PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Reel = {
  id: string;
  reel_url: string;
};

const reelFormSchema = z.object({
  reel_url: z.string().url("Please enter a valid Instagram Reel URL."),
});

type ReelFormValues = z.infer<typeof reelFormSchema>;

export const InstagramReelManager = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm<ReelFormValues>({
    resolver: zodResolver(reelFormSchema),
    defaultValues: {
      reel_url: "",
    },
  });

  const fetchReels = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("instagram_reels")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch reels.");
    } else {
      setReels(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReels();
  }, []);

  const onSubmit = async (data: ReelFormValues) => {
    try {
      const { error } = await supabase.from("instagram_reels").insert([data]);
      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          throw new Error("This Reel link has already been added.");
        }
        throw error;
      }
      toast.success("Reel added successfully!");
      fetchReels();
      form.reset();
    } catch (error: any) {
      toast.error(`Failed to add reel: ${error.message}`);
    }
  };

  const handleDelete = async (reelId: string) => {
    if (!window.confirm("Are you sure you want to delete this reel?")) return;
    try {
      const { error } = await supabase.from("instagram_reels").delete().eq("id", reelId);
      if (error) throw error;
      toast.success("Reel deleted successfully!");
      fetchReels();
    } catch (error: any) {
      toast.error(`Failed to delete reel: ${error.message}`);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Instagram Reels Management</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4 mb-6">
          <FormField
            control={form.control}
            name="reel_url"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <Input placeholder="https://www.instagram.com/reel/.../embed" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 px-4 py-2 rounded-md shadow-md"
            disabled={form.formState.isSubmitting}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Reel
          </Button>
        </form>
      </Form>
      
      <div className="rounded-md border border-gray-300">
        {loading ? (
          <div className="p-4 space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reel URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reels.map((reel) => (
                <TableRow key={reel.id}>
                  <TableCell className="font-medium truncate max-w-xs text-gray-900">{reel.reel_url}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-900" 
                      onClick={() => handleDelete(reel.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};