"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Trash2, Edit, PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export type Slide = {
  id: string;
  created_at: string;
  image_url: string;
  enroll_button_visible: boolean;
  syllabus_button_visible: boolean;
  slide_order: number | null;
};

const slideFormSchema = z.object({
  image: z.any().optional(),
  enroll_button_visible: z.boolean().default(true),
  syllabus_button_visible: z.boolean().default(true),
  slide_order: z.coerce.number().int().optional(),
});

type SlideFormValues = z.infer<typeof slideFormSchema>;

const SlideForm = ({
  currentSlide,
  onSuccess,
}: {
  currentSlide?: Slide | null;
  onSuccess: () => void;
}) => {
  const form = useForm<SlideFormValues>({
    resolver: zodResolver(slideFormSchema),
    defaultValues: {
      image: undefined,
      enroll_button_visible: currentSlide?.enroll_button_visible ?? true,
      syllabus_button_visible: currentSlide?.syllabus_button_visible ?? true,
      slide_order: currentSlide?.slide_order || 0,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: SlideFormValues) => {
    try {
      let imageUrl = currentSlide?.image_url;

      // Check if a new image file is provided
      if (data.image && data.image.size > 0) {
        const file = data.image as File;
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("hero_images")
          .upload(fileName, file);

        if (uploadError) throw new Error(uploadError.message);

        const { data: urlData } = supabase.storage
          .from("hero_images")
          .getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      if (!imageUrl) {
        form.setError("image", { message: "An image is required." });
        return;
      }

      const payload = {
        image_url: imageUrl,
        enroll_button_visible: data.enroll_button_visible,
        syllabus_button_visible: data.syllabus_button_visible,
        slide_order: data.slide_order || 0,
      };

      if (currentSlide) {
        const { error } = await supabase
          .from("hero_slides")
          .update(payload)
          .eq("id", currentSlide.id);
        if (error) throw error;
        toast.success("Slide updated successfully!");
      } else {
        const { error } = await supabase.from("hero_slides").insert([payload]);
        if (error) throw error;
        toast.success("Slide created successfully!");
      }
      onSuccess();
      form.reset();
    } catch (error: any) {
      toast.error(`Failed to save slide: ${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slide Image</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                />
              </FormControl>
              <FormDescription>
                Recommended dimensions: 1920x1080 pixels. Max size: 5MB.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slide_order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slide Order</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-4">
          <FormField
            control={form.control}
            name="enroll_button_visible"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Show Enroll Button</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="syllabus_button_visible"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Show Syllabus Button</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Slide"}
        </Button>
      </form>
    </Form>
  );
};

export const HeroSlideManager = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);

  const fetchSlides = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .order("slide_order", { ascending: true });

    if (error) {
      toast.error("Failed to fetch slides.");
    } else {
      setSlides(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleAddNew = () => {
    setEditingSlide(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide);
    setIsDialogOpen(true);
  };

  const handleDelete = async (slideId: string) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;
    try {
      const { error } = await supabase.from("hero_slides").delete().eq("id", slideId);
      if (error) throw error;
      toast.success("Slide deleted successfully!");
      fetchSlides();
    } catch (error: any) {
      toast.error(`Failed to delete slide: ${error.message}`);
    }
  };

  const onFormSuccess = () => {
    setIsDialogOpen(false);
    fetchSlides();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Hero Section Management</h2>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Slide
        </Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingSlide ? "Edit Slide" : "Add New Slide"}</DialogTitle>
            <DialogDescription>
              {editingSlide ? "Update the details for this slide." : "Upload a new image and configure the slide options."}
            </DialogDescription>
          </DialogHeader>
          <SlideForm currentSlide={editingSlide} onSuccess={onFormSuccess} />
        </DialogContent>
      </Dialog>
      <div className="rounded-md border">
        {loading ? (
          <div className="space-y-2 p-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Enroll Button</TableHead>
                <TableHead>Syllabus Button</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slides.map((slide) => (
                <TableRow key={slide.id}>
                  <TableCell className="font-medium">{slide.slide_order}</TableCell>
                  <TableCell>
                    <img src={slide.image_url} alt="Slide" className="h-10 w-16 object-cover rounded-md border" />
                  </TableCell>
                  <TableCell>{slide.enroll_button_visible ? "Visible" : "Hidden"}</TableCell>
                  <TableCell>{slide.syllabus_button_visible ? "Visible" : "Hidden"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(slide)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(slide.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
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