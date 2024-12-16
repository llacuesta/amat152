import { Handle, Position } from "@xyflow/react";

function CustomNode({ data }) {
    console.log(`is selected for ${data.courseID} is ${data.status}`)
  return (
    <div className={`flex flex-col h-14 w-32 justify-center items-center rounded-xl outline outline-2 outline-white ${data.status == 1 ? `bg-blue-700` : data.status == 2 ? `bg-amber-700` : `bg-slate-900`} hover:cursor-pointer ${data.status == 1 ? 'scale-110' : 'scale-100'} transition-all ${data.status == 2 && 'pointer-events-none'}`}
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
