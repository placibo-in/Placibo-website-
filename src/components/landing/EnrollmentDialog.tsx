"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { EnrollmentForm } from "./EnrollmentForm";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";

export const EnrollmentDialog = () => {
  const { isOpen, onClose } = useEnrollmentDialog();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enroll Now</DialogTitle>
          <DialogDescription>
            Fill out the form below to start your application. We're excited to have you!
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <EnrollmentForm onSuccess={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};