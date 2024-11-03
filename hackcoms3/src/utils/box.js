export default function Box({prop}) {
    return <>
        <div className="min-h-screen bg-orange-100 p-6">
            <div className="container mx-auto border-2 border-slate-500 p-8 rounded-xl shadow-xl max-w-4xl">
                {prop}
            </div>
        </div>
            
    </>
}