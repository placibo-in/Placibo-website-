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
      <DialogContent className="sm:max-w-[425px] bg-white text-gray-900">
        <DialogHeader>
          <DialogTitle>Enroll Now</DialogTitle>
          <DialogDescription className="text-gray-600">
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