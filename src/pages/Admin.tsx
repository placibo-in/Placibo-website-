"use client";

import { useEffect, useState } from "react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  icon: z.enum(["PenTool", "Code", "Server", "Database", "BrainCircuit"]),
});

type ProgramFormValues = z.infer<typeof formSchema>;

const Admin = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Programs state and form
  const [programs, setPrograms] = useState<ProgramFormValues & { id: string }[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [editingProgram, setEditingProgram] = useState<null | (ProgramFormValues & { id: string })>(null);

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
      if (!session) {
        navigate('/login');
      } else {
        setIsLoaded(true);
      }
    };
    checkUser();
  }, [navigate]);

  const fetchPrograms = async () => {
    setLoadingPrograms(true);
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Failed to fetch programs.");
    } else if (data) {
      setPrograms(data as any);
    }
    setLoadingPrograms(false);
  };

  useEffect(() => {
    if (isLoaded) {
      fetchPrograms();
    }
  }, [isLoaded]);

  const onSubmit = async (values: ProgramFormValues) => {
    if (editingProgram) {
      // Update existing
      const { error } = await supabase
        .from("programs")
        .update(values)
        .eq("id", editingProgram.id);

      if (error) {
        toast.error("Failed to update program.");
      } else {
        toast.success("Program updated successfully.");
        setEditingProgram(null);
        form.reset();
        fetchPrograms();
      }
    } else {
      // Insert new
      const { error } = await supabase.from("programs").insert([values]);

      if (error) {
        toast.error("Failed to add program.");
      } else {
        toast.success("Program added successfully.");
        form.reset();
        fetchPrograms();
      }
    }
  };

  const handleEdit = (program: ProgramFormValues & { id: string }) => {
    setEditingProgram(program);
    form.reset(program);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this program?")) return;
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete program.");
    } else {
      toast.success("Program deleted successfully.");
      if (editingProgram?.id === id) {
        setEditingProgram(null);
        form.reset();
      }
      fetchPrograms();
    }
  };

  const handleCancelEdit = () => {
    setEditingProgram(null);
    form.reset();
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

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

        {/* Programs Management Section */}
        <section>
          <SeedPrograms />

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{editingProgram ? "Edit Program" : "Add New Program"}</CardTitle>
              <CardDescription>
                Manage your courses here. Add new or update existing programs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="UI/UX Design Course" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="4 Months" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Learn design thinking, wireframing, prototyping..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                          <Input placeholder="/courses/ui-ux-design" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                          <SelectContent>
                            {iconOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <div className="flex items-center gap-2">
                                  {React.createElement(iconMap[option.value], { className: "h-4 w-4" })}
                                  <span>{option.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      {editingProgram ? "Update Program" : "Add Program"}
                    </Button>
                    {editingProgram && (
                      <Button variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="mt-8 max-w-4xl">
            <h2 className="text-xl font-semibold mb-4">Existing Programs</h2>
            {loadingPrograms ? (
              <p>Loading...</p>
            ) : programs.length === 0 ? (
              <p>No programs found.</p>
            ) : (
              <div className="space-y-4">
                {programs.map((program) => {
                  const IconComponent = iconMap[program.icon] || PenTool;
                  return (
                    <Card key={program.id} className="flex justify-between items-center p-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 rounded-full p-2.5 w-fit">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{program.title}</h3>
                          <p className="text-sm text-gray-600">{program.duration}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleEdit(program)}>
                          Edit
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(program.id)}>
                          Delete
                        </Button>
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