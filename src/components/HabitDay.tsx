import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx'

import { ProgressBar } from './ProgressBar';
import dayjs from 'dayjs';
import { HabitsList } from './HabitList';

interface HabitDayProps {
    date: Date
    defaultCompleted?: number
    amount?: number
}

export function HabitDay({ defaultCompleted = 0, amount = 0, date }: HabitDayProps) {
    const [completed, setCompleted] = useState(defaultCompleted)

    const completePercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')

    function handleAmountCompletedChanged(completed: number) {
        setCompleted(completed)
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx('w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus-ring-violet-700 focus:ring-offset-2 focus:ring-offset-background', {
                    'bg-zinc-900 border-zinc-800': completePercentage === 0,
                    'bg-green-900 border-green-800': completePercentage > 0 && completePercentage < 20,
                    'bg-green-700 border-green-600': completePercentage >= 20 && completePercentage < 40,
                    'bg-green-600 border-green-500': completePercentage >= 40 && completePercentage < 60,
                    'bg-green-500 border-green-400': completePercentage >= 60 && completePercentage < 80,
                    'bg-green-300 border-green-200': completePercentage >= 80,
                })}
            />

            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400">{dayOfWeek}</span>

                    <span className="mt-1 font-extrabold leading-tight text-3xl border">{dayAndMonth}</span>

                    <ProgressBar progress={completePercentage} />

                    <HabitsList date={date} onCompletedChanged={handleAmountCompletedChanged} />

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}