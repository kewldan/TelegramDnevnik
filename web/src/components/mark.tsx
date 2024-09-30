import {cn} from "@/lib/utils";

export default function Mark({value, className}: { value: string; className?: string }) {
    return (
        <span className={cn(
            value === 'Н' && 'text-violet-500',
            value === '!' && 'text-pink-700 font-extrabold',
            value === '1' && 'text-purple-500',
            value === '2' && 'text-red-500',
            value === '3' && 'text-yellow-600',
            value === '4' && 'text-green-400',
            value === '5' && 'text-green-600', className
        )}>{value}</span>
    )
}