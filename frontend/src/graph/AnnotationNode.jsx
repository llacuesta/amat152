export default function AnnotationNode({data}) {
    return (
    <div className={`text-white ${data.size == "sm" ? 'font-light text-xl' : 'font-bold text-4xl'}`} >
        {data.note}
    </div>
    )
}