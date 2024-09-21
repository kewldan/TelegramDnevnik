import {cn} from "@/lib/utils";

export type MarkValue = 1 | 2 | 3 | 4 | 5;

export default function Mark({value, className}: { value: MarkValue; className?: string }) {
    return (
        <span className={cn(
            value === 1 && 'text-purple-500',
            value === 2 && 'text-red-500',
            value === 3 && 'text-yellow-600',
            value === 4 && 'text-green-400',
            value === 5 && 'text-green-600', className
        )}>{value}</span>
    )
}