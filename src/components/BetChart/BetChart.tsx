import { useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import type { BetRecord } from '@/types/bet'
import { formatChartData, getChartColor } from '@/utils/formatChartData'
import { ChartTooltip } from './ChartTooltip'
import styles from './BetChart.module.css'

type Props = {
  history: BetRecord[]
}

export const BetChart = ({ history }: Props) => {
  const data = useMemo(() => formatChartData(history), [history])
  const color = useMemo(() => getChartColor(data), [data])

  return (
    <div className={styles.wrapper}>
      <p className={styles.chartTitle}>Аналітика прибутку</p>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <AreaChart
          data={data}
          margin={{ top: 20, right: 15, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient
              id="profitGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={color}
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor={color}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="var(--text-primary)"
            strokeOpacity={0.2}
            vertical={false}
          />

          <ReferenceLine
            y={0}
            stroke="var(--text-primary)"
            strokeOpacity={1}
            strokeWidth={1.5}
          />

          <XAxis
            dataKey="name"
            tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            width={45}
            tickFormatter={(value) =>
              Math.abs(value) >= 1000
                ? `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
                : value
            }
          />

          <Tooltip
            content={<ChartTooltip />}
            cursor={{ stroke: color, strokeWidth: 2, strokeDasharray: '5 5' }}
          />

          <Area
            type="monotone"
            dataKey="profit"
            stroke={color}
            strokeWidth={2}
            fill="url(#profitGradient)"
            dot={{ fill: color, stroke: '#fff', strokeWidth: 1.5, r: 4 }}
            activeDot={{ r: 6, fill: '#fff', stroke: color, strokeWidth: 2 }}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
