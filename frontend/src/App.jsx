import { useState, useCallback, useEffect } from "react";
import {
  IconInfoCircle,
  IconQuestionMark,
  IconArrowRight,
  IconClick,
} from "@tabler/icons-react";

import axios from "axios";

import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import CustomNode from "./graph/CustomNode";
import { courses, edges } from "./assets/courses";
import AnnotationNode from "./graph/AnnotationNode";
import SelectedCourseTag from "./component/SelectedCourseTag";
import useSelectedNodesStore from "./stores/SelectedNodesStore";
import usePriorityNodesStore from "./stores/PriorityNodesStore";

const nodeTypes = {
  custom: CustomNode,
  annotation: AnnotationNode,
};

/**
 * Node Status:
 * 0 -> Not Taken
 * 1 -> Selected
 * 2 -> Taken
 * 3 -> Suggested
 */

const testNodes = courses;

const testEdges = edges;

const loadingTakenCoursesPrompt = "Loading taken courses...";
const gettingSuggestedCourses = "Computing for suggested courses...";

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(testNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(testEdges);
  const selectedNodes = useSelectedNodesStore((state) => state.selectedNodes);
  const setSelectedNodes = useSelectedNodesStore(
    (state) => state.setSelectedNodes
  );

  const priorityNodes = usePriorityNodesStore((state) => state.priorityNodes);
  const setPriorityNodes = usePriorityNodesStore(
    (state) => state.setPriorityNodes
  );

  const [takenCourses, setTakenCourses] = useState([]);
  const [suggestedCourses, setSuggestedCourses] = useState([]);

  // Field data
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedSem, setSelectedSem] = useState(1);

  const [criterion, setCriterion] = useState("workload");

  const [optimization, setOptimization] = useState("none");

  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingPrompot, setLoadingPrompt] = useState("Loading...");

  const fetchTakenCourse = async () => {
    try {
      const res = await axios.post("http://localhost:3000/get-taken-courses", {
        year: selectedYear,
        sem: selectedSem,
      });

      console.log(res.data["taken"]);
      setTakenCourses(res.data["taken"]);
    } catch (e) {
      console.error(e);
    }
  };

  const applySetup = () => {
    setLoadingCourses(true);
    setLoadingPrompt(loadingTakenCoursesPrompt);

    async function fetchData() {
      await fetchTakenCourse();
      setLoadingCourses(false);
    }

    fetchData();
  };

  const getSuggestedCourses = () => {
    setLoadingCourses(true);
    setLoadingPrompt(gettingSuggestedCourses);

    async function postData() {
      try {
        const res = await axios.post(
          "http://localhost:3000/get-suggested-courses",
          {
            year: selectedYear,
            sem: selectedSem,
            criterion: criterion,
            isMax:
              optimization === "none"
                ? null
                : optimization === "max"
                ? true
                : false,
            haventTaken: [...selectedNodes],
            priority: [...priorityNodes],
          }
        );

        setSuggestedCourses(res.data['suggestedCourses']);
      } catch (e) {
        console.error(e);
      }
    }

    async function perform() {
      await postData();
      setLoadingCourses(false);
    }

    perform();
  };

  useEffect(() => {
    setLoadingCourses(true);
    setLoadingPrompt(loadingTakenCoursesPrompt);

    async function fetchData() {
      await fetchTakenCourse();
      setLoadingCourses(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const isTaken = takenCourses.some((course) => course.id === node.id);
        if (isTaken) {
          return {
            ...node,
            data: {
              ...node.data,
              status: 2,
            },
          };
        }
        return {
          ...node,
          data: {
            ...node.data,
            status: 0,
          },
        };
      })
    );

    setSelectedNodes(new Set());
    setPriorityNodes(new Set());
  }, [takenCourses]);

  useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const isSuggested = suggestedCourses.some(
          (course) => course.id === node.id
        );
        if (isSuggested) {
          return {
            ...node,
            data: {
              ...node.data,
              status: 3,
            },
          };
        }
        return {
          ...node,
          data: {
            ...node.data,
            status: node.data.status === 1 ? 1 : node.data.status === 2 ? 2 : 0,
          },
        };
      })
    );

  }, [suggestedCourses]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (event, node) => {
    if (node.data.status === 2) {
      return;
    }

    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          // Toggle node selection
          setSelectedNodes((prevSelectedNodes) => {
            const newSelectedNodes = new Set(prevSelectedNodes);

            if (newSelectedNodes.has(node.id)) {
              newSelectedNodes.delete(node.id);
            } else {
              newSelectedNodes.add(node.id);
            }

            return newSelectedNodes;
          });

          // Toggle node status
          return {
            ...n,
            data: {
              ...n.data,
              status: n.data.status === 0 ? 1 : 0,
            },
          };
        }

        return n;
      })
    );
  };

  return (
    // Viewport
    <div className="relative" style={{ width: "100vw", height: "100vh" }}>
      {loadingCourses && (
        <div className="absolute h-full w-full bg-black-700/20 z-[51] backdrop-blur-xl">
          <div className="flex flex-col gap-2 items-center h-full min-w-full justify-center">
            {loadingPrompot}
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      )}
      <div className="absolute top-2.5 left-2.5 z-50">
        <div className="bg-gray-950/70 h-32 w-36 rounded-xl outline outline-[1px] outline-white/50 backdrop-blur-xl flex flex-col justify-center p-3">
          <div className="flex flex-row gap-2 text-xs font-bold mb-1 items-center">
            <div>
              <IconInfoCircle size={14} />
            </div>
            LEGEND
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 rounded-md bg-slate-900"></div>
              <div className="text-xs">NOT YET TAKEN</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 rounded-md bg-amber-700"></div>
              <div className="text-xs">TAKEN</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 rounded-md bg-green-600"></div>
              <div className="text-xs">SUGGESTED</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 rounded-md bg-blue-700"></div>
              <div className="text-xs">SELECTED</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="absolute top-0 right-0 h-full w-96 z-50 p-4">
        <div className="bg-gray-950/70 h-full rounded-xl outline outline-[1px] outline-white/50 p-6 backdrop-blur-xl flex flex-col">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <div className="text-white font-bold text-2xl">
                  Course Scheduler
                </div>
                <button className="btn btn-ghost btn-xs">
                  <IconInfoCircle size={18} />
                </button>
              </div>
              <div className="text-xs mt-2">
                A simple scheduler with prioritization constraints for the BS
                Computer Science curriculum at UPLB.
              </div>
              <div className="h-[1px] w-full bg-white/20 my-3"></div>

              {/* Standing selector */}
              <div className="flex flex-col">
                <div
                  className="tooltip tooltip-top flex justify-center items-center mb-2 gap-2"
                  data-tip="Select your standing."
                >
                  <div className="text-white font-bold text-xs">SETUP</div>
                  <IconQuestionMark size={14} />
                </div>
                <div className="flex flex-row justify-between">
                  <select
                    defaultValue={selectedYear}
                    className="select w-full select-sm max-w-xs"
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                  >
                    <option value={1}>1st Year</option>
                    <option value={2}>2nd Year</option>
                    <option value={3}>3rd Year</option>
                    <option value={4}>4th Year</option>
                  </select>
                  <div className="w-10"></div>
                  <select
                    defaultValue={selectedSem}
                    className="select select-sm max-w-xs"
                    onChange={(e) => setSelectedSem(Number(e.target.value))}
                  >
                    <option value={1}>1st Semester</option>
                    <option value={2}>2nd Semester</option>
                    <option value={3}>Midyear</option>
                  </select>
                </div>
                <button
                  className="btn btn-primary btn-sm mt-3"
                  onClick={applySetup}
                >
                  APPLY
                </button>
              </div>

              <div className="h-[1px] w-full bg-white/20 mt-4"></div>

              <div className="flex flex-col mt-3">
                <div
                  className="flex flex-row justify-center gap-2 tooltip tooltip-top mb-2"
                  data-tip="What metric do you want to prioritize?"
                >
                  <div className="text-white font-bold text-xs">CRITERION</div>
                  <IconQuestionMark size={14} />
                </div>
                <div className="flex justify-between px-4">
                  <label className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="criterion"
                      id="workload"
                      className="radio"
                      defaultChecked
                      onChange={() => setCriterion("workload")}
                    />
                    <div className="text-sm">Workload</div>
                  </label>
                  <label className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="criterion"
                      id="units"
                      className="radio"
                      onChange={() => setCriterion("units")}
                    />
                    <div className="text-sm">Units</div>
                  </label>
                </div>
              </div>

              <div className="h-[1px] w-full bg-white/20 mt-4"></div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-white font-bold text-xs">OPTIMIZATION</div>
                <select
                  value={"none"}
                  className="select select-sm max-w-xs"
                  onChange={(e) => setOptimization(e.target.value)}
                >
                  <option value={"none"}>None</option>
                  <option value={"max"}>Maximize</option>
                  <option value={"min"}>Minimize</option>
                </select>
              </div>

              <div className="h-[1px] w-full bg-white/20 mt-4"></div>

              <div className="flex flex-col w-full mt-4">
                <div className="text-white font-bold text-xs flex justify-center w-full mb-3">
                  SELECTED COURSES
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedNodes.size == 0 ? (
                    <div className="flex flex-col items-center">
                      <IconClick className="opacity-50 mb-3" size={90} />
                      <div className="text-xl font-medium flex justify-center w-full text-center">
                        No course selected
                      </div>
                      <div className="text-xs flex justify-center w-full text-center">
                        Click on a course that you plan to take in the following
                        semester.
                      </div>
                    </div>
                  ) : (
                    [...selectedNodes].map((cid) => {
                      return (
                        <SelectedCourseTag
                          key={cid}
                          courseID={cid}
                          nodes={nodes}
                          setNodes={setNodes}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="h-[1px] w-full bg-white/20 my-4"></div>
              <button
                className="btn btn-primary w-full"
                onClick={getSuggestedCourses}
              >
                SUGGEST COURSES
                <IconArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Graph */}
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
