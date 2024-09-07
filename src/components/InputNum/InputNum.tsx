import { formatCurrency } from '../../utils/functions';
import type { CollectValue } from '../../utils/types';
import './InputNum.css'

const format = (v: string) => v.replace(/^$|^0+(\d+)|([^\d,.]+)/, (match, digit, char) => match === '' ? '0' : char ? '' : digit)

export default function InputNum({
  name = '',
  value = '',
  secondary = '',
  invert = false,
  onChange: handleChange,
  onBlur,
}: {
  name: string;
  value: string;
  secondary: string;
  invert?: boolean;
  onChange: CollectValue;
  onBlur?: CollectValue;
}) {

  function onChange({ currentTarget: { name, value } }: React.ChangeEvent<HTMLInputElement>) {
    handleChange(name, format(value))
  }

  return (
    <>
      <label className='input-num'>
        <p className='input-num__name'>{name}</p>
        <div className={`input-num__group${invert ? " input-num__group_invert" : ""}`}>
          <input 
            className={`input-num__item`} 
            name={name} 
            type='text' 
            inputMode='numeric'
            value={value} 
            required 
            onChange={onChange} 
            pattern='^(([1-9]\d*(\.\d+)?|0?\.\d+)|[1-9]\d{0,2}(,\d{3})*(\.\d+)?)$' 
            autoComplete='off'
            onBlur={({ currentTarget }) => {
              if(typeof onBlur !== 'function') return
              const format = formatCurrency(+currentTarget.value.replace(/,/g, ''), {style: undefined})
              onBlur(currentTarget.name, format)
            }}
          />
          <p className={`input-num__secundary`} >{secondary}</p>
        </div>
        <span className='input-num__error'>This field is required</span>
      </label>
    </>
  )
}
