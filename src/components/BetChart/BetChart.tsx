import { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { BetRecord } from '@/types/bet'
import { CHART_TEXTS, type CurrencyValue } from '@/constants'
import { formatChartData } from '@/utils/formatChartData'
import { useIsMobile } from '@/hooks'
import { ChartTooltip } from './ChartTooltip'
import { CHART_CONFIG } from './chartConfig'
import styles from './BetChart.module.css'

type Props = {
  history: BetRecord[]
  rates: Partial<Record<CurrencyValue, number>>
}

export const BetChart = ({ history, rates }: Props) => {
  const chartData = useMemo(
    () => formatChartData(history, rates),
    [history, rates],
  )
  const color = 'var(--accent-primary)'

  const isMobile = useIsMobile()

  const renderCustomTick = ({
    x,
    y,
    payload,
  }: {
    x: string | number
    y: string | number
    payload: { value: string }
  }) => {
    const item = chartData.find((d) => d.name === payload.value)
    if (!item || item.name === '') return null

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={isMobile ? 6 : 16}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize={CHART_CONFIG.TICK_FONT_SIZE}
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
      <p className={styles.chartTitle}>{CHART_TEXTS.TITLE}</p>
      <ResponsiveContainer
        width="100%"
        height={isMobile ? CHART_CONFIG.HEIGHT_MOBILE : CHART_CONFIG.HEIGHT_DESKTOP}
      >
        <AreaChart
          data={chartData}
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
            minTickGap={isMobile ? 0 : CHART_CONFIG.MIN_TICK_GAP}
            interval={isMobile ? 0 : 'preserveEnd'}
            padding={{ right: isMobile ? 15 : 40, left: isMobile ? 10 : 20 }}
          />
          <YAxis
            tick={{
              fill: 'var(--text-muted)',
              fontSize: CHART_CONFIG.TICK_FONT_SIZE,
              fontWeight: 600,
            }}
            axisLine={false}
            tickLine={false}
            width={CHART_CONFIG.Y_AXIS_WIDTH}
            tickFormatter={(value) =>
              Math.abs(value) >= CHART_CONFIG.THOUSAND_THRESHOLD
                ? `${(value / CHART_CONFIG.THOUSAND_THRESHOLD).toFixed(value % CHART_CONFIG.THOUSAND_THRESHOLD === 0 ? 0 : 1)}k`
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
            dot={{
              fill: color,
              stroke: 'var(--chart-dot-contrast)',
              strokeWidth: 1.5,
              r: CHART_CONFIG.DOT_RADIUS,
            }}
            activeDot={{
              r: CHART_CONFIG.ACTIVE_DOT_RADIUS,
              fill: 'var(--chart-dot-contrast)',
              stroke: color,
              strokeWidth: 2,
            }}
            animationDuration={CHART_CONFIG.ANIMATION_DURATION_MS}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
