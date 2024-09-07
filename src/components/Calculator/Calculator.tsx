import { useState } from "react"
import "./Calculator.css"
import InputNum from "../InputNum/InputNum.tsx"
import SubmitBtn from "../SubmitBtn/SubmitBtn.tsx";
import Radio from "../Radio/Radio.tsx";
import Form from "../Form/Form.tsx";
import { formatCurrency } from "../../utils/functions.tsx";

const names = ["Mortgage Amount", "Mortgage Term", "Interest Rate"] as const;
const [amount, term, rate] = names;
const voidForm = Object.fromEntries(names.map(n => [n, '0']));
const radioOptions = ['Repayment', 'Interest Only'] as const;
const [repayment] = radioOptions;
const mortgageType = 'Mortgage Type';
voidForm[mortgageType] = "";

interface CalculatorFields {
  [mortgageType]: typeof radioOptions[number] | "";
  [amount]: string;
  [term]: string;
  [rate]: string;
}

function processMortgage(form: CalculatorFields) {
  const doNum = (field: keyof CalculatorFields) => +form[field].replace(/,/g, '');
  const amountAsNum = doNum(amount);
  const termAsNum = doNum(term) * 12;
  const rateAsNum = doNum(rate) / 100 / 12;
  let formula = 0;

  if (form[mortgageType] === repayment) {
    const ratePoweredByTerm = (1 + rateAsNum) ** termAsNum;
    formula = amountAsNum * ((rateAsNum * ratePoweredByTerm) / (ratePoweredByTerm - 1));
  } else {
    formula = amountAsNum * rateAsNum
  }

  return {
    monthly: formatCurrency(formula),
    total: formatCurrency(formula * termAsNum),
  };
}

export default function Calculator({ reset, onSubmit: handleSubmit }: {reset: Function, onSubmit: Function}) {
  const [form, setForm] = useState(voidForm as unknown as CalculatorFields);

  function collectValue(name: string, value: string) {
    setForm(form => ({ ...form, [name]: value }))
  }

  function onSubmit() {
    const mortgage = processMortgage(form);
    handleSubmit(mortgage)
  }

  return (
    <>
      <Form className="calculator" onSubmit={onSubmit}>
        <hgroup className="calculator__hgroup">
          <h1 className="calculator__title">Mortgage Calculator</h1>
          <button className="calculator__reset" type="button" onClick={() => reset()}>Clear All</button>
        </hgroup>
        <InputNum name={amount} secondary="£" invert onChange={collectValue} value={form[amount]} onBlur={collectValue} />
        <InputNum name={term} secondary="years" onChange={collectValue} value={form[term]} />
        <InputNum name={rate} secondary="%" onChange={collectValue} value={form[rate]} />
        <Radio options={radioOptions} name={mortgageType} onChange={collectValue} value={form[mortgageType]} />
        <SubmitBtn />
      </Form>
    </>
  )
}
