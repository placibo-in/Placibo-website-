"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { HeroSlideManager } from "@/components/admin/HeroSlideManager";
import { InstagramReelManager } from "@/components/admin/InstagramReelManager";
import { BatchDateManager } from "@/components/admin/BatchDateManager";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { PenTool, Code, Server, Database, BrainCircuit } from "lucide-react";
import { SeedPrograms } from "@/components/SeedPrograms";

const iconOptions = [
  { label: "PenTool", value: "PenTool" },
  { label: "Code", value: "Code" },
  { label: "Server", value: "Server" },
  { label: "Database", value: "Database" },
  { label: "BrainCircuit", value: "BrainCircuit" },
];

const iconMap = {
  PenTool,
  Code,
  Server,
  Database,
  BrainCircuit,
};

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  link: z.string().min(1, "Link is required"),
  icon: z.enum(["PenTool", "Code", "Server", "Database", "BrainCircuit"]).optional(),
  image: z.any().optional(),
});

type ProgramFormValues = z.infer<typeof formSchema>;

type Program = {
  id: string;
  title: string;
  duration: string;
  description: string;
  link: string;
  icon: keyof typeof iconMap | null;
  icon_url: string | null;
};

const Admin = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [iconChoice, setIconChoice] = useState<'default' | 'custom'>('default');

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      duration: "",
      description: "",
      link: "",
      icon: "PenTool",
    },
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/login');
      else setIsLoaded(true);
    };
    checkUser();
  }, [navigate]);

  const fetchPrograms = async () => {
    setLoadingPrograms(true);
    setFetchError(null);
    const { data, error } = await supabase.from("programs").select("*").order("created_at", { ascending: true });
    if (error) {
      setFetchError(error.message);
      toast.error("Failed to fetch programs.");
    } else if (data) {
      setPrograms(data as Program[]);
    }
    setLoadingPrograms(false);
  };

  useEffect(() => {
    if (isLoaded) fetchPrograms();
  }, [isLoaded]);

  const onSubmit = async (values: ProgramFormValues) => {
    if (iconChoice === 'default' && !values.icon) {
      form.setError('icon', { message: 'Please select a default icon.' });
      return;
    }
    if (iconChoice === 'custom' && (!values.image || values.image.length === 0) && !editingProgram?.icon_url) {
      form.setError('image', { message: 'Please upload a custom icon.' });
      return;
    }

    let customIconUrl = editingProgram?.icon_url || null;

    if (iconChoice === 'custom' && values.image && values.image.length > 0) {
      const file = values.image[0] as File;
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("hero_images").upload(`program_icons/${fileName}`, file);
      if (uploadError) {
        toast.error(`Icon upload failed: ${uploadError.message}`);
        return;
      }
      const { data: urlData } = supabase.storage.from("hero_images").getPublicUrl(`program_icons/${fileName}`);
      customIconUrl = urlData.publicUrl;
    }

    const payload = {
      title: values.title,
      duration: values.duration,
      description: values.description,
      link: values.link,
      icon: iconChoice === 'default' ? values.icon : null,
      icon_url: iconChoice === 'custom' ? customIconUrl : null,
    };

    const promise = editingProgram
      ? supabase.from("programs").update(payload).eq("id", editingProgram.id)
      : supabase.from("programs").insert([payload]);

    const { error } = await promise;

    if (error) {
      toast.error(`Failed to save program: ${error.message}`);
    } else {
      toast.success(`Program ${editingProgram ? 'updated' : 'added'} successfully.`);
      setEditingProgram(null);
      form.reset();
      setIconChoice('default');
      fetchPrograms();
    }
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    form.reset(program);
    if (program.icon_url) setIconChoice('custom');
    else setIconChoice('default');
  };

  const handleCancelEdit = () => {
    setEditingProgram(null);
    form.reset();
    setIconChoice('default');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (error) toast.error("Failed to delete program.");
    else {
      toast.success("Program deleted.");
      if (editingProgram?.id === id) handleCancelEdit();
      fetchPrograms();
    }
  };

  if (!isLoaded) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24 md:pt-32 space-y-12">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid gap-8">
          <BatchDateManager />
          <HeroSlideManager />
          <InstagramReelManager />
        </div>
        <section>
          <SeedPrograms />
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{editingProgram ? "Edit Program" : "Add New Program"}</CardTitle>
              <CardDescription>Manage your courses here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
                  {/* Form fields for title, duration, etc. */}
                  <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="UI/UX Design Course" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="duration" render={({ field }) => (<FormItem><FormLabel>Duration</FormLabel><FormControl><Input placeholder="4 Months" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Input placeholder="Learn design thinking..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="link" render={({ field }) => (<FormItem><FormLabel>Link</FormLabel><FormControl><Input placeholder="/courses/ui-ux-design" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  
                  <FormItem>
                    <FormLabel>Icon Type</FormLabel>
                    <RadioGroup value={iconChoice} onValueChange={(v) => setIconChoice(v as 'default' | 'custom')} className="flex gap-4 pt-2">
                      <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="default" id="default-icon" /></FormControl><Label htmlFor="default-icon">Default</Label></FormItem>
                      <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="custom" id="custom-icon" /></FormControl><Label htmlFor="custom-icon">Custom</Label></FormItem>
                    </RadioGroup>
                  </FormItem>

                  {iconChoice === 'default' ? (
                    <FormField control={form.control} name="icon" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                          <SelectContent>
                            {iconOptions.map(o => {
                              const IconComponent = iconMap[o.value as keyof typeof iconMap];
                              return (
                                <SelectItem key={o.value} value={o.value}>
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="h-4 w-4" />
                                    <span>{o.label}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  ) : (
                    <FormField control={form.control} name="image" render={({ field: { onChange, ...props } }) => (
                      <FormItem>
                        <FormLabel>Custom Icon</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" onChange={e => onChange(e.target.files)} {...props} />
                        </FormControl>
                        <FormDescription>Upload a custom icon.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                  )}

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">{editingProgram ? "Update Program" : "Add Program"}</Button>
                    {editingProgram && <Button variant="outline" type="button" onClick={handleCancelEdit}>Cancel</Button>}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="mt-8 max-w-4xl">
            <h2 className="text-xl font-semibold mb-4">Existing Programs</h2>
            {fetchError && <p className="text-red-600 mb-4">Error: {fetchError}</p>}
            {loadingPrograms ? <p>Loading...</p> : programs.length === 0 ? <p>No programs found.</p> : (
              <div className="space-y-4">
                {programs.map((program) => {
                  const IconComponent = program.icon ? iconMap[program.icon] : null;
                  return (
                    <Card key={program.id} className="flex justify-between items-center p-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 rounded-full p-2.5 w-12 h-12 flex items-center justify-center">
                          {program.icon_url ? <img src={program.icon_url} alt={program.title} className="h-8 w-8 object-contain" /> : IconComponent ? <IconComponent className="h-6 w-6 text-blue-600" /> : null}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{program.title}</h3>
                          <p className="text-sm text-gray-600">{program.duration}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleEdit(program)}>Edit</Button>
                        <Button variant="destructive" onClick={() => handleDelete(program.id)}>Delete</Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;