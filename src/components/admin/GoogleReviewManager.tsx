"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2, Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Review = {
  id: string;
  name: string;
  review_date: string;
  rating: number;
  review_text: string;
  avatar_url: string | null;
};

const reviewSchema = z.object({
  name: z.string().min(2, "Name is required."),
  review_date: z.string().min(1, "Date is required."),
  rating: z.coerce.number().int().min(1).max(5),
  review_text: z.string().min(10, "Review text is required."),
  avatar: z.any().optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export const GoogleReviewManager = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: "", review_date: new Date().toISOString().split('T')[0], rating: 5, review_text: "" },
  });

  const fetchReviews = async () => {
    setLoading(true);
    const { data } = await supabase.from("google_reviews").select("*").order("review_date", { ascending: false });
    setReviews(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const onSubmit = async (values: ReviewFormValues) => {
    let avatarUrl = editingReview?.avatar_url || null;

    if (values.avatar && values.avatar.length > 0) {
      const file = values.avatar[0] as File;
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("hero_images").upload(`avatars/${fileName}`, file);
      if (uploadError) {
        toast.error(`Avatar upload failed: ${uploadError.message}`);
        return;
      }
      const { data: urlData } = supabase.storage.from("hero_images").getPublicUrl(`avatars/${fileName}`);
      avatarUrl = urlData.publicUrl;
    }

    const payload = { ...values, avatar_url: avatarUrl };
    delete payload.avatar;
    
    const promise = editingReview
      ? supabase.from("google_reviews").update(payload).eq("id", editingReview.id)
      : supabase.from("google_reviews").insert([payload]);

    const { error } = await promise;

    if (error) {
      toast.error(`Failed to save review: ${error.message}`);
    } else {
      toast.success(`Review ${editingReview ? 'updated' : 'created'} successfully!`);
      form.reset();
      setEditingReview(null);
      fetchReviews();
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    form.reset({
      ...review,
      review_date: new Date(review.review_date).toISOString().split('T')[0],
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    const { error } = await supabase.from("google_reviews").delete().eq("id", id);
    if (error) toast.error("Failed to delete review.");
    else {
      toast.success("Review deleted.");
      if (editingReview?.id === id) {
        setEditingReview(null);
        form.reset();
      }
      fetchReviews();
    }
  };

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{editingReview ? "Edit Review" : "Add New Google Review"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="review_date" render={({ field }) => (<FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="rating" render={({ field }) => (<FormItem><FormLabel>Rating</FormLabel><Select onValueChange={(v) => field.onChange(parseInt(v))} value={String(field.value)}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{[5,4,3,2,1].map(r => <SelectItem key={r} value={String(r)}>{r} Stars</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="review_text" render={({ field }) => (<FormItem><FormLabel>Review Text</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="avatar" render={({ field: { onChange, ...props } }) => (<FormItem><FormLabel>Avatar</FormLabel><FormControl><Input type="file" accept="image/*" onChange={e => onChange(e.target.files)} {...props} /></FormControl><FormMessage /></FormItem>)} />
              <div className="flex gap-4">
                <Button type="submit">{editingReview ? "Update Review" : "Add Review"}</Button>
                {editingReview && <Button variant="outline" type="button" onClick={() => { setEditingReview(null); form.reset(); }}>Cancel</Button>}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Existing Reviews</h3>
        {loading ? <p>Loading...</p> : (
          <div className="space-y-4">
            {reviews.map(review => (
              <Card key={review.id} className="flex justify-between items-center p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatar_url || undefined} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.review_text.substring(0, 40)}...</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(review)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(review.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};