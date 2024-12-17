import { Handle, Position } from "@xyflow/react";

function CustomNode({ data }) {
  let nodeColor = 'bg-slate-900'

  switch (data.status) {
    case 0:
      nodeColor = 'bg-slate-900';
      break
    case 1:
      nodeColor = 'bg-blue-700';
      break;
    case 2:
      nodeColor = 'bg-amber-700';
      break;
    case 3:
      nodeColor = 'bg-green-600';
      break
    default:
      nodeColor = 'bg-slate-900'
  }

  return (
    <div className={`flex flex-col h-14 w-32 justify-center items-center rounded-xl outline outline-2 outline-white  hover:cursor-pointer ${nodeColor} ${data.status == 1 ? 'scale-110' : 'scale-100'} transition-all ${(data.status == 2 || data.status === 3) && 'pointer-events-none'}`}
        style={{strokeWidth: 10}}
    >
      <div className="text-white font-bold">{data.courseID}</div>
      <div className="text-white text-xs font-light">{data.units} UNITS</div>

      <Handle
        type="source"
        position={Position.Right}

      />
      <Handle
        type="target"
        position={Position.Left}
      />
    </div>
  );
}

export default CustomNode;
