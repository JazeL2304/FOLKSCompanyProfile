import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import SelectPlan from '../components/payment/SelectPlan'
import Information from '../components/payment/Information'
import FinalPayment from '../components/payment/FinalPayment'
import '../styles/Payment.css'

const steps = ['Select Plan', 'Information', 'Final Payment']

const Payment = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [paymentData, setPaymentData] = useState({})
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const program = searchParams.get('program') || 'Business English'
  const price = searchParams.get('price') || '450'
  const level = searchParams.get('level') || 'SD'
  const category = searchParams.get('category') || 'General'

  const programInfo = { program, price, level, category }

  const next = (data = {}) => {
    setPaymentData(prev => ({ ...prev, ...data }))
    setCurrentStep(s => Math.min(s + 1, 2))
  }

  const prev = () => {
    if (currentStep === 0) navigate(-1)
    else setCurrentStep(s => s - 1)
  }

  return (
    <div className="payment-page">
      {/* Top bar */}
      <div className="payment-topbar">
        <button className="payment-back" onClick={prev}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </button>

        {/* Stepper */}
        <div className="payment-stepper">
          {steps.map((step, i) => (
            <div key={step} className="payment-stepper__item">
              <div className={`payment-stepper__circle ${
                i < currentStep ? 'done' :
                i === currentStep ? 'active' : ''
              }`}>
                {i < currentStep ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="white" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <span className={`payment-stepper__label ${
                i <= currentStep ? 'active' : ''
              }`}>{step}</span>
              {i < steps.length - 1 && (
                <div className={`payment-stepper__line ${i < currentStep ? 'done' : ''}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="payment-content">
        {currentStep === 0 && (
          <SelectPlan programInfo={programInfo} onNext={next} />
        )}
        {currentStep === 1 && (
          <Information programInfo={programInfo} paymentData={paymentData} onNext={next} />
        )}
        {currentStep === 2 && (
          <FinalPayment programInfo={programInfo} paymentData={paymentData} onNext={next} />
        )}
      </div>
    </div>
  )
}

export default Payment