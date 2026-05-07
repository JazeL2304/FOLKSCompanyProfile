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

const planIcons = {
  consultation: <IconLightning />,
  intensive: <IconTarget />,
  full: <IconTrophy />,
}

const Information = ({ programInfo, paymentData, onNext }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    notes: '',
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext({ personalInfo: form })
  }

  const plan = paymentData.selectedPlan

  return (
    <div className="payment-layout">
      {/* LEFT — form */}
      <div className="payment-left">
        <h2 className="payment-section-title">Personal Information</h2>
        <p className="payment-section-desc">
          Please fill in your details so we can prepare your consultation.
        </p>

        <form className="info-form" onSubmit={handleSubmit}>
          <div className="info-form__row">
            <div className="info-form__group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="info-form__group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="info-form__row">
            <div className="info-form__group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+62 8xx xxxx xxxx"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="info-form__group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="info-form__group info-form__group--full">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="info-form__group info-form__group--full">
            <label>Additional Notes (Optional)</label>
            <textarea
              name="notes"
              placeholder="Any specific goals or questions for your trainer..."
              value={form.notes}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <button type="submit" className="payment-btn-next">
            Continue to Payment →
          </button>
        </form>
      </div>

      {/* RIGHT — summary */}
      <div className="payment-right">
        <div className="payment-info-card">
          <div className="payment-info-card__header">
            <div className="payment-info-card__icon">{planIcons[plan?.id] || <IconLightning />}</div>
            <div>
              <div className="payment-info-card__name">{plan?.name}</div>
              <div className="payment-info-card__sub">{programInfo.program} · {programInfo.level}</div>
            </div>
          </div>
          <div className="payment-info-card__price">
            <span className="payment-info-card__price-label">Biaya Program</span>
            <span className="payment-info-card__price-value">{formatRupiah(plan?.price)}</span>
          </div>
          <ul className="payment-info-card__features">
            <li>✓ Certified FOLKS trainer</li>
            <li>✓ Personalized learning path</li>
            <li>✓ Progress assessment</li>
            <li>✓ Certificate of completion</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Information