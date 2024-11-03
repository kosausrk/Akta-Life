export default function Box({prop}) {
    return <>
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
            <div className="container mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl max-w-4xl">
                {prop}
            </div>
        </div>
            
    </>
}