import { IconStar, IconStarFilled, IconX } from "@tabler/icons-react";
import useSelectedNodesStore from "../stores/SelectedNodesStore";
import usePriorityNodesStore from "../stores/PriorityNodesStore";
import { useState } from "react";

export default function SelectedCourseTag({ courseID, nodes, setNodes }) {
  const selectedNodes = useSelectedNodesStore((state) => state.selectedNodes);
  const setSelectedNodes = useSelectedNodesStore(
    (state) => state.setSelectedNodes
  );

  const priorityNodes = usePriorityNodesStore(
    (state) => state.prioritizedNodes
  );
  const setPriorityNodes = usePriorityNodesStore(
    (state) => state.setPriorityNodes
  );

  const [filled, setFilled] = useState(priorityNodes?.has(courseID));

  const handleStarButton = () => {  
    setPriorityNodes((prevPriorityNodes) => {
      const newPriorityNodes = new Set(prevPriorityNodes); // Copy the current Set
  
      if (newPriorityNodes?.has(courseID)) {
        newPriorityNodes.delete(courseID); // Remove if already exists
        setFilled(false);
      } else {
        newPriorityNodes.add(courseID); // Add if not exists
        setFilled(true);
      }

      console.log(newPriorityNodes)
  
      return newPriorityNodes; // Return the updated Set
    });
  };

  const unselectCourse = () => {
    if (priorityNodes?.has(courseID)) {
        setPriorityNodes((prevPriorityNodes) => {
            const newPriorityNodes = new Set(prevPriorityNodes); 
            newPriorityNodes.delete(courseID); 
            return newPriorityNodes; // Return the updated Set
        });
    }

    setNodes((nds) => 
        nds.map((n) => {
            if (n.id === courseID) {
                return {
                    ...n,
                    data: {
                        ...n.data,
                        status: n.data.status === 0 ? 1 : 0,
                      },
                }
            }

            return n
        })
    )

    setSelectedNodes((prevSelectedNodes) => {
        const newSelectedNodes = new Set(prevSelectedNodes);
        newSelectedNodes.delete(courseID);
        return newSelectedNodes
    })
  }

  return (
    <div className="join outline w-min text-nowrap">
      <button className="btn btn-ghost btn-xs join-item" onClick={handleStarButton} >
        {filled ? (
          <IconStarFilled size={12} />
        ) : (
          <IconStar size={12} />
        )}
      </button>
      <div className="font-bold join-item text-sm flex items-center">
        {courseID.toUpperCase()}
      </div>
      <button className="btn btn-ghost btn-xs join-item" onClick={unselectCourse}>
        <IconX size={12} />
      </button>
    </div>
  );
}
