import { create } from 'zustand';

const useSelectedNodesStore = create((set) => ({
  selectedNodes: new Set(), // Initial state
  setSelectedNodes: (updater) =>
    set((state) => {
      const updatedSelectedNodes =
        typeof updater === 'function' // Check if updater is a function
          ? updater(state.selectedNodes) // Pass current state to updater
          : updater; // Otherwise, directly set the value
      return { selectedNodes: updatedSelectedNodes };
    }),
}));

export default useSelectedNodesStore;
