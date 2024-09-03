import './Radio.css'

const hasError = 'radio_has-error'

function filterInvalid({ elements }: HTMLFieldSetElement) {
  return Array.from(elements).some(e => e instanceof HTMLInputElement && !e.validity.valid)
}

export default function Radio({
  name,
  options,
  onChange,
  value,
}:{
  name: string;
  options: readonly string[];
  onChange: Function;
  value: string;
}) {
  function checkValidity({currentTarget: target}: React.FocusEvent<HTMLFieldSetElement, Element>) {
    filterInvalid(target) ?
      target.classList.add(hasError) :
      target.classList.remove(hasError)
  }

  return (
    <>
      <fieldset className="radio" name={name} onBlur={checkValidity} onClick={({ currentTarget }) => {!filterInvalid(currentTarget) && currentTarget.classList.remove(hasError)}} >
        <legend>{name}</legend>
        {options.map(option => 
          <label className='radio__label' key={option} >
            <input 
              className='radio__input'
              type="radio" 
              value={option} 
              name={name} 
              onChange={({ currentTarget: { name, value }}) => onChange(name, value)}
              required
              checked={value === option}
            />
            <span>{option}</span>
          </label>
        )}
        <p className='radio__error'>This field is required</p>
      </fieldset>
    </>
  )
}