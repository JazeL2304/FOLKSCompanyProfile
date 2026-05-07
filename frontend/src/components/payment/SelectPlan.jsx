import { useState } from 'react'

const formatRupiah = (amount) => 'Rp\u00a0' + amount.toLocaleString('id-ID')

const IconLightning = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#EF6D60">
    <path d="M13 2L4.09 12.96A1 1 0 0 0 5 14.5h6.5L10 22l9.91-10.96A1 1 0 0 0 19 9.5H12.5L13 2Z"/>
  </svg>
)

const IconTarget = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#105647" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2" fill="#105647"/>
  </svg>
)

const IconTrophy = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#105647" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H3.5a2.5 2.5 0 0 0 0 5H6"/>
    <path d="M18 9h2.5a2.5 2.5 0 0 1 0 5H18"/>
    <path d="M6 3h12v11a6 6 0 0 1-12 0V3z"/>
    <path d="M9 21h6"/>
    <path d="M12 17v4"/>
  </svg>
)

const plans = [
  {
    id: 'consultation',
    name: 'Expert Consultation Plan',
    desc: '60-minute session with a certified TOEFL/IELTS trainer.',
    price: 200000,
    icon: <IconLightning />,
    popular: true,
  },
  {
    id: 'intensive',
    name: 'Intensive Learning Plan',
    desc: '10-session intensive course with weekly progress tracking.',
    price: 500000,
    icon: <IconTarget />,
    popular: false,
  },
  {
    id: 'full',
    name: 'Full Program Access',
    desc: 'Unlimited access to all modules for 3 months.',
    price: 750000,
    icon: <IconTrophy />,
    popular: false,
  },
]

const SelectPlan = ({ programInfo, onNext }) => {
  const [selected, setSelected] = useState('consultation')

  const selectedPlan = plans.find(p => p.id === selected)

  return (
    <div className="payment-layout">
      {/* LEFT */}
      <div className="payment-left">
        <h2 className="payment-section-title">Select Your Plan</h2>
        <p className="payment-section-desc">
          Choose the plan that best fits your learning goals for{' '}
          <strong>{programInfo.program}</strong>.
        </p>

        <div className="plan-list">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`plan-card ${selected === plan.id ? 'plan-card--selected' : ''}`}
              onClick={() => setSelected(plan.id)}
            >
              {plan.popular && (
                <span className="plan-card__popular">MOST POPULAR</span>
              )}
              <div className="plan-card__left">
                <div className="plan-card__icon">{plan.icon}</div>
                <div>
                  <div className="plan-card__name">{plan.name}</div>
                  <div className="plan-card__desc">{plan.desc}</div>
                </div>
              </div>
              <div className="plan-card__right">
                <div className="plan-card__price">{formatRupiah(plan.price)}</div>
                <div className={`plan-card__radio ${selected === plan.id ? 'plan-card__radio--active' : ''}`}>
                  {selected === plan.id && <div className="plan-card__radio-dot" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="plan-summary">
          <div className="plan-summary__row">
            <span>Program</span>
            <span>{programInfo.program} ({programInfo.level})</span>
          </div>
          <div className="plan-summary__row">
            <span>Category</span>
            <span>{programInfo.category}</span>
          </div>
          <div className="plan-summary__row plan-summary__row--total">
            <span>Total</span>
            <span>{formatRupiah(selectedPlan?.price)}</span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="payment-right">
        <div className="payment-info-card">
          <div className="payment-info-card__header">
            <div className="payment-info-card__icon">{selectedPlan?.icon}</div>
            <div>
              <div className="payment-info-card__name">{selectedPlan?.name}</div>
              <div className="payment-info-card__sub">{programInfo.program} · {programInfo.level}</div>
            </div>
          </div>
          <div className="payment-info-card__price">
            <span className="payment-info-card__price-label">Biaya Program</span>
            <span className="payment-info-card__price-value">{formatRupiah(selectedPlan?.price)}</span>
          </div>
          <p className="payment-info-card__desc">{selectedPlan?.desc}</p>

          <ul className="payment-info-card__features">
            <li>✓ Certified FOLKS trainer</li>
            <li>✓ Personalized learning path</li>
            <li>✓ Progress assessment</li>
            <li>✓ Certificate of completion</li>
          </ul>
        </div>

        <button
          className="payment-btn-next"
          onClick={() => onNext({ selectedPlan })}
        >
          Continue to Information →
        </button>
      </div>
    </div>
  )
}

export default SelectPlan