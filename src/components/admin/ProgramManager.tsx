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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { toast } from "sonner";
import { Trash2, Edit, PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Program = {
  id: string;
  title: string;
  duration: string;
  description: string;
  link: string;
  icon: string | null;
  icon_url: string | null;
};

const programSchema = z.object({
  title: z.string().min(3, "Title is required."),
  duration: z.string().min(2, "Duration is required."),
  description: z.string().min(10, "Description is required."),
  link: z.string().startsWith("/", { message: "Link must start with a /" }),
  icon: z.string().optional(),
  icon_image: z.any().optional(),
});

type ProgramFormValues = z.infer<typeof programSchema>;

export const ProgramManager = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
    defaultValues: { title: "", duration: "", description: "", link: "/", icon: "" },
  });

  const fetchPrograms = async () => {
    setLoading(true);
    const { data } = await supabase.from("programs").select("*").order("created_at", { ascending: false });
    setPrograms(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const onSubmit = async (values: ProgramFormValues) => {
    let iconUrl = editingProgram?.icon_url || null;

    if (values.icon_image && values.icon_image.length > 0) {
      const file = values.icon_image[0] as File;
      const fileName = `program_icons/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("hero_images").upload(fileName, file);

      if (uploadError) {
        toast.error(`Icon upload failed: ${uploadError.message}`);
        return;
      }
      const { data: urlData } = supabase.storage.from("hero_images").getPublicUrl(fileName);
      iconUrl = urlData.publicUrl;
    }

    const payload = {
      title: values.title,
      duration: values.duration,
      description: values.description,
      link: values.link,
      icon: values.icon || null,
      icon_url: iconUrl,
    };
    
    const promise = editingProgram
      ? supabase.from("programs").update(payload).eq("id", editingProgram.id)
      : supabase.from("programs").insert([payload]);

    const { error } = await promise;

    if (error) {
      toast.error(`Failed to save program: ${error.message}`);
    } else {
      toast.success(`Program ${editingProgram ? 'updated' : 'created'} successfully!`);
      form.reset();
      setEditingProgram(null);
      fetchPrograms();
    }
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    form.reset(program);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (error) toast.error("Failed to delete program.");
    else {
      toast.success("Program deleted.");
      if (editingProgram?.id === id) {
        setEditingProgram(null);
        form.reset();
      }
      fetchPrograms();
    }
  };

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{editingProgram ? "Edit Program" : "Create New Program"}</CardTitle>
          <CardDescription>Manage the courses displayed on your homepage.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="duration" render={({ field }) => (<FormItem><FormLabel>Duration</FormLabel><FormControl><Input {...field} placeholder="e.g., 4 Months" /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="link" render={({ field }) => (<FormItem><FormLabel>Link</FormLabel><FormControl><Input {...field} placeholder="/courses/your-course-name" /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="icon" render={({ field }) => (<FormItem><FormLabel>Lucide Icon Name (Optional)</FormLabel><FormControl><Input {...field} placeholder="e.g., PenTool" /></FormControl><FormDescription>Use a name from lucide-react icons. This is overridden by an icon image.</FormDescription><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="icon_image" render={({ field: { onChange, ...props } }) => (<FormItem><FormLabel>Custom Icon Image (Optional)</FormLabel><FormControl><Input type="file" accept="image/*" onChange={e => onChange(e.target.files)} {...props} /></FormControl><FormDescription>Upload a custom image for the icon. Recommended size: 64x64 pixels.</FormDescription><FormMessage /></FormItem>)} />
              <div className="flex gap-4">
                <Button type="submit">{editingProgram ? "Update Program" : "Create Program"}</Button>
                {editingProgram && <Button variant="outline" type="button" onClick={() => { setEditingProgram(null); form.reset(); }}>Cancel</Button>}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Existing Programs</h3>
        {loading ? <Skeleton className="h-24 w-full" /> : (
          <div className="space-y-4">
            {programs.map(program => (
              <Card key={program.id} className="flex justify-between items-center p-4">
                <div className="flex items-center gap-4">
                  {program.icon_url && <img src={program.icon_url} alt={program.title} className="h-10 w-10 object-contain" />}
                  <p className="font-semibold">{program.title}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(program)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(program.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};