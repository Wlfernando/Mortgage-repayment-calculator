import type { Mortgage } from "../../utils/types"
import empty from '../../assets/illustration-empty.svg'
import './Results.css'

export default function Result({
  monthly,
  total,
}: {
  monthly: Mortgage['monthly'];
  total: Mortgage['total']
}) {
  const isIdle = monthly === '';

  return (
    <>
      <section className={`results${isIdle ? "" : " results_received"}`}>
        {isIdle ?
          <>
            <img src={empty} alt="A financial sheet, calculator, pen, and money." />
            <h2>Results shown here</h2>
            <p className="results__resume">Complete the form and click "calculate repayment" to se what your monthly repayments would be.</p>
          </> :
          <>
            <h2 className="results__title">Your results</h2>
            <p className="results__resume">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayment" again.</p>
            <article className="results__snippet">
              <div>
                <h3 className="results__sub-title">Your monthly repayments</h3>
                <p className="results__monthly">{monthly}</p>
              </div>
              <hr className="results__hr" />
              <div>
                <h3 className="results__sub-title">Total you'll repay over the term</h3>
                <p>{total}</p>
              </div>
            </article>
          </>
        }
      </section>
    </>
  )
}