import { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { BetRecord } from '@/types/bet'
import { formatChartData } from '@/utils/formatChartData'
import { useMobile } from '@/hooks'
import { ChartTooltip } from './ChartTooltip'
import styles from './BetChart.module.css'

type Props = {
  history: BetRecord[]
  rates: Record<string, number>
}

export const BetChart = ({ history, rates }: Props) => {
  const data = useMemo(() => formatChartData(history, rates), [history, rates])
  const color = '#10b981'

  const isMobile = useMobile()

  const renderCustomTick = ({
    x,
    y,
    payload,
  }: {
    x: string | number
    y: string | number
    payload: { value: string }
  }) => {
    const item = data.find((d) => d.name === payload.value)
    if (!item || item.name === '') return null

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={isMobile ? 6 : 16}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize={12}
          fontWeight={600}
        >
          <tspan>{item.gameIcon}</tspan>
          <tspan
            className={styles.hideOnMobile}
          >{` ${item.dateStr} ${item.timeStr}`}</tspan>
        </text>
      </g>
    )
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.chartTitle}>Аналітика прибутку</p>
      <ResponsiveContainer
        width="100%"
        height={isMobile ? 200 : 300}
      >
        <AreaChart
          data={data}
          margin={{ top: 5, right: isMobile ? 0 : 15, left: 0, bottom: 10 }}
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
                stopOpacity={0.5}
              />
              <stop
                offset="95%"
                stopColor={color}
                stopOpacity={0.1}
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
            tick={renderCustomTick}
            axisLine={false}
            tickLine={false}
            dy={isMobile ? 0 : 10}
            minTickGap={isMobile ? 0 : 50}
            interval={isMobile ? 0 : 'preserveEnd'}
            padding={{ right: isMobile ? 15 : 40, left: isMobile ? 10 : 20 }}
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
