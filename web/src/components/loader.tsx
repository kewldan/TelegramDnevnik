import {Loader2} from "lucide-react";

export default function Loader() {
    return (
        <main className="h-screen w-full flex justify-center items-center">
            <Loader2 className="animate-spin w-16 h-16"/>
        </main>
    )
}