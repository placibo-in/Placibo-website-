"use client";

import { create } from 'zustand';

interface EnrollmentDialogState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useEnrollmentDialog = create<EnrollmentDialogState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));