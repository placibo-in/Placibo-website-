"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const BATCH_DATE_KEY = 'next_batch_start_date';

export const BatchDateManager = () => {
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDate = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', BATCH_DATE_KEY)
        .single();

      if (data?.value) {
        setDate(data.value);
      } else if (error) {
        toast({
          title: "Error",
          description: "Could not fetch the current batch date.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    };

    fetchDate();
  }, [toast]);

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from('site_settings')
      .update({ value: date, updated_at: new Date().toISOString() })
      .eq('key', BATCH_DATE_KEY);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save the new date. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "The batch start date has been updated.",
      });
    }
    setIsSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Batch Start Date</CardTitle>
        <CardDescription>
          Update the "Next batch starts" date displayed on the homepage.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-24">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g., September 1, 2025"
              className="flex-grow"
            />
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};