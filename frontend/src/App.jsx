import { useState, useCallback } from "react";


import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import CustomNode from "./graph/CustomNode";
import {courses, edges} from './assets/courses'
import AnnotationNode from "./graph/AnnotationNode";

const nodeTypes = {
  custom: CustomNode,
  annotation: AnnotationNode
}

/**
 * Node Status:
 * 0 -> Not Taken
 * 1 -> Selected
 * 2 -> Taken
 */



const testNodes = courses

const testEdges = edges


function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(testNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(testEdges);
  const [selectedNodes, setSelectedNodes] = useState(new Set());

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = useCallback((event, node) => {
    console.log(`clicked: ${node.data.courseID}`);
    setNodes((nds) => 
      nds.map((n) => {
        // Clicked node
        if (n.id === node.id) {
          if (n.status == 2) {
            return n;
          }

          setSelectedNodes((prevSelectedNodes) => {
            const newSelectedNodes = new Set(prevSelectedNodes);
            if (newSelectedNodes.has(node.id)) {
              newSelectedNodes.delete(node.id);
            } else {
              newSelectedNodes.add(node.id);
            }

            return newSelectedNodes;
          });

          return {
            ...n,
            data: {
              ...n.data,
              status: n.data.status == 0 ? 1 : 0,
            },
          };
        }

        return n;
      })
    );
  }, [selectedNodes]);

  return (
    <div className="relative" style={{ width: "100vw", height: "100vh" }}>
      <div className="absolute top-0 right-0 h-full w-96 z-50 p-4">
        <div className="bg-gray-950/70 h-full rounded-xl outline outline-[1px] outline-white/50 p-5 backdrop-blur-xl flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="text-white font-bold text-2xl">
              Course Scheduler
            </div>
            
          </div>
          <div className="text-xs mt-2">
            A simple scheduler with prioritization constraints for the BS Computer Science curriculum at UPLB.
          </div>
        </div>
      </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          edgesUpdatable={false}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          elementsSelectable={false}
          fitView={true}
        >
          <Controls />
          <Background variant="dots" gap={40} size={1} />
        </ReactFlow>


    </div>
  );
}

export default App;
