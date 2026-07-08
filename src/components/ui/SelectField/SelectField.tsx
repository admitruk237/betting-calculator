import * as Select from '@radix-ui/react-select'
import { ChevronDown, Check } from 'lucide-react'
import styles from './SelectField.module.css'

interface SelectOption {
  value: string
  label: string
}

type Props = {
  label: string
  value: string
  onValueChange: (value: string) => void
  options: readonly SelectOption[]
  placeholder?: string
  error?: string
  id?: string
  disabled?: boolean
}

export const SelectField = ({
  label,
  value,
  onValueChange,
  options,
  placeholder,
  error,
  id,
  disabled,
}: Props) => {
  return (
    <div className={styles.container}>
      <label
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
      <Select.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <Select.Trigger
          id={id}
          className={`${styles.trigger} ${error ? styles.triggerError : ''}`}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon className={styles.icon}>
            <ChevronDown size={18} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className={styles.content}
            position="popper"
            sideOffset={5}
          >
            <Select.Viewport className={styles.viewport}>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className={styles.item}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className={styles.itemIndicator}>
                    <Check size={14} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
}
