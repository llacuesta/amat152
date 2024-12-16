import { create } from 'zustand';

const usePriorityNodesStore = create((set) => ({
  priorityNodes: new Set(), // Initial state
  setPriorityNodes: (updater) =>
    set((state) => {
      const updatedPriorityNodes =
        typeof updater === 'function' // Check if updater is a function
          ? updater(state.priorityNodes)
          : updater; // Otherwise, directly set
      return { priorityNodes: updatedPriorityNodes };
    }),
}));

export default usePriorityNodesStore;
