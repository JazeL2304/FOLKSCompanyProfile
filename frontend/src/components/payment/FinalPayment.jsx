import { useState } from 'react'

const paymentMethods = [
  {
    id: 'qris',
    label: 'QRIS',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="1.5" stroke="#105647" strokeWidth="2"/>
        <rect x="13" y="2" width="9" height="9" rx="1.5" stroke="#105647" strokeWidth="2"/>
        <rect x="2" y="13" width="9" height="9" rx="1.5" stroke="#105647" strokeWidth="2"/>
        <rect x="4" y="4" width="5" height="5" rx="0.5" fill="#105647"/>
        <rect x="15" y="4" width="5" height="5" rx="0.5" fill="#105647"/>
        <rect x="4" y="15" width="5" height="5" rx="0.5" fill="#105647"/>
        <rect x="15" y="15" width="2" height="2" fill="#105647"/>
        <rect x="19" y="15" width="2" height="2" fill="#105647"/>
        <rect x="15" y="19" width="2" height="2" fill="#105647"/>
        <rect x="19" y="19" width="2" height="2" fill="#105647"/>
        <rect x="17" y="17" width="2" height="2" fill="#105647"/>
      </svg>
    ),
  },
  {
    id: 'transfer',
    label: 'Bank Transfer',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#105647" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
        <path d="M6 15h4"/>
      </svg>
    ),
  },
  {
    id: 'card',
    label: 'Kartu Debit / Kredit',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#105647" strokeWidth="2" strokeLinecap="round">
        <rect x="1" y="4" width="22" height="16" rx="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
        <line x1="5" y1="15" x2="9" y2="15"/>
      </svg>
    ),
  },
]

const banks = [
  { id: 'bca', name: 'BCA', no: '1234567890', atas: 'FOLKS Institute' },
  { id: 'mandiri', name: 'Mandiri', no: '9876543210', atas: 'FOLKS Institute' },
  { id: 'bni', name: 'BNI', no: '1122334455', atas: 'FOLKS Institute' },
  { id: 'bri', name: 'BRI', no: '5544332211', atas: 'FOLKS Institute' },
]

const formatRupiah = (amount) => 'Rp ' + amount.toLocaleString('id-ID')

const IconLightning = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#EF6D60">
    <path d="M13 2L4.09 12.96A1 1 0 0 0 5 14.5h6.5L10 22l9.91-10.96A1 1 0 0 0 19 9.5H12.5L13 2Z"/>
  </svg>
)

/* QR Code yang lebih proporsional & realistis */
const QRCode = () => (
  <svg width="180" height="180" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* TOP-LEFT finder */}
    <rect x="1" y="1" width="10" height="10" rx="1.2" fill="#105647"/>
    <rect x="2.2" y="2.2" width="7.6" height="7.6" rx="0.6" fill="white"/>
    <rect x="3.5" y="3.5" width="5" height="5" rx="0.4" fill="#105647"/>

    {/* TOP-RIGHT finder */}
    <rect x="26" y="1" width="10" height="10" rx="1.2" fill="#105647"/>
    <rect x="27.2" y="2.2" width="7.6" height="7.6" rx="0.6" fill="white"/>
    <rect x="28.5" y="3.5" width="5" height="5" rx="0.4" fill="#105647"/>

    {/* BOTTOM-LEFT finder */}
    <rect x="1" y="26" width="10" height="10" rx="1.2" fill="#105647"/>
    <rect x="2.2" y="27.2" width="7.6" height="7.6" rx="0.6" fill="white"/>
    <rect x="3.5" y="28.5" width="5" height="5" rx="0.4" fill="#105647"/>

    {/* Timing patterns */}
    <rect x="13" y="1" width="1.5" height="1.5" fill="#105647"/>
    <rect x="16" y="1" width="1.5" height="1.5" fill="#105647"/>
    <rect x="19" y="1" width="1.5" height="1.5" fill="#105647"/>
    <rect x="22" y="1" width="1.5" height="1.5" fill="#105647"/>

    <rect x="13" y="4" width="1.5" height="1.5" fill="#105647"/>
    <rect x="16" y="4" width="1.5" height="1.5" fill="#105647"/>
    <rect x="19" y="4" width="1.5" height="1.5" fill="#105647"/>

    <rect x="13" y="7" width="1.5" height="1.5" fill="#105647"/>
    <rect x="22" y="7" width="1.5" height="1.5" fill="#105647"/>

    <rect x="1" y="13" width="1.5" height="1.5" fill="#105647"/>
    <rect x="4" y="13" width="1.5" height="1.5" fill="#105647"/>
    <rect x="7" y="13" width="1.5" height="1.5" fill="#105647"/>
    <rect x="1" y="16" width="1.5" height="1.5" fill="#105647"/>
    <rect x="7" y="16" width="1.5" height="1.5" fill="#105647"/>
    <rect x="1" y="19" width="1.5" height="1.5" fill="#105647"/>
    <rect x="4" y="19" width="1.5" height="1.5" fill="#105647"/>
    <rect x="7" y="19" width="1.5" height="1.5" fill="#105647"/>
    <rect x="1" y="22" width="1.5" height="1.5" fill="#105647"/>
    <rect x="7" y="22" width="1.5" height="1.5" fill="#105647"/>

    {/* Data modules - area tengah */}
    <rect x="13" y="13" width="1.5" height="1.5" fill="#105647"/>
    <rect x="16" y="13" width="1.5" height="1.5" fill="#105647"/>
    <rect x="19" y="13" width="1.5" height="1.5" fill="#105647"/>
    <rect x="22" y="13" width="1.5" height="1.5" fill="#105647"/>
    <rect x="25" y="13" width="1.5" height="1.5" fill="#105647"/>
    <rect x="28" y="13" width="1.5" height="1.5" fill="#105647"/>
    <rect x="31" y="13" width="1.5" height="1.5" fill="#105647"/>
    <rect x="34" y="13" width="1.5" height="1.5" fill="#105647"/>

    <rect x="13" y="16" width="1.5" height="1.5" fill="#105647"/>
    <rect x="19" y="16" width="1.5" height="1.5" fill="#105647"/>
    <rect x="25" y="16" width="1.5" height="1.5" fill="#105647"/>
    <rect x="28" y="16" width="1.5" height="1.5" fill="#105647"/>
    <rect x="34" y="16" width="1.5" height="1.5" fill="#105647"/>

    <rect x="13" y="19" width="1.5" height="1.5" fill="#105647"/>
    <rect x="16" y="19" width="1.5" height="1.5" fill="#105647"/>
    <rect x="22" y="19" width="1.5" height="1.5" fill="#105647"/>
    <rect x="25" y="19" width="1.5" height="1.5" fill="#105647"/>
    <rect x="31" y="19" width="1.5" height="1.5" fill="#105647"/>

    <rect x="13" y="22" width="1.5" height="1.5" fill="#105647"/>
    <rect x="19" y="22" width="1.5" height="1.5" fill="#105647"/>
    <rect x="22" y="22" width="1.5" height="1.5" fill="#105647"/>
    <rect x="28" y="22" width="1.5" height="1.5" fill="#105647"/>
    <rect x="34" y="22" width="1.5" height="1.5" fill="#105647"/>

    <rect x="13" y="25" width="1.5" height="1.5" fill="#105647"/>
    <rect x="16" y="25" width="1.5" height="1.5" fill="#105647"/>
    <rect x="19" y="25" width="1.5" height="1.5" fill="#105647"/>
    <rect x="25" y="25" width="1.5" height="1.5" fill="#105647"/>
    <rect x="31" y="25" width="1.5" height="1.5" fill="#105647"/>

    <rect x="13" y="28" width="1.5" height="1.5" fill="#105647"/>
    <rect x="22" y="28" width="1.5" height="1.5" fill="#105647"/>
    <rect x="25" y="28" width="1.5" height="1.5" fill="#105647"/>
    <rect x="28" y="28" width="1.5" height="1.5" fill="#105647"/>
    <rect x="34" y="28" width="1.5" height="1.5" fill="#105647"/>

    <rect x="13" y="31" width="1.5" height="1.5" fill="#105647"/>
    <rect x="16" y="31" width="1.5" height="1.5" fill="#105647"/>
    <rect x="19" y="31" width="1.5" height="1.5" fill="#105647"/>
    <rect x="22" y="31" width="1.5" height="1.5" fill="#105647"/>
    <rect x="28" y="31" width="1.5" height="1.5" fill="#105647"/>
    <rect x="31" y="31" width="1.5" height="1.5" fill="#105647"/>

    <rect x="13" y="34" width="1.5" height="1.5" fill="#105647"/>
    <rect x="19" y="34" width="1.5" height="1.5" fill="#105647"/>
    <rect x="25" y="34" width="1.5" height="1.5" fill="#105647"/>
    <rect x="31" y="34" width="1.5" height="1.5" fill="#105647"/>
    <rect x="34" y="34" width="1.5" height="1.5" fill="#105647"/>
  </svg>
)

/* Summary Card Hijau — sesuai design referensi */
const SummaryCard = ({ plan, total, couponApplied }) => (
  <div className="payment-summary-card">
    <div className="payment-summary-card__fee-label">Biaya Program</div>
    <div className="payment-summary-card__price">{formatRupiah(total)}</div>
    {couponApplied && (
      <div className="payment-summary-card__discount">Diskon 10% diterapkan ✓</div>
    )}

    <div className="payment-summary-card__divider" />

    {/* Assessment row */}
    <div className="payment-summary-card__assessment-row">
      <div className="payment-summary-card__check-icon">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      </div>
      <strong className="payment-summary-card__assessment-title">Consultation &amp; Assessment</strong>
    </div>

    <p className="payment-summary-card__assessment-desc">
      We will assess your current English proficiency level and tailor a custom learning path just for you. Relax while our experts handle your educational goals.
    </p>

    <div className="payment-summary-card__divider" />

    {/* Plan info */}
    <div className="payment-summary-card__plan">
      <div className="payment-summary-card__plan-icon">
        <IconLightning />
      </div>
      <div className="payment-summary-card__plan-info">
        <strong>{plan?.name || 'Expert Consultation Plan'}</strong>
        <span>{plan?.desc || '60-minute session with a certified TOEFL/IELTS trainer.'}</span>
      </div>
      <button className="payment-summary-card__change">Change</button>
    </div>
  </div>
)

const FinalPayment = ({ programInfo, paymentData }) => {
  const [payMethod, setPayMethod] = useState('qris')
  const [selectedBank, setSelectedBank] = useState('bca')
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({
    fullName: paymentData?.personalInfo?.fullName || '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  const plan = paymentData?.selectedPlan
  const price = plan?.price || 200000
  const discount = couponApplied ? price * 0.1 : 0
  const total = price - discount

  const handleChange = (e) => {
    let { name, value } = e.target
    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16)
      value = value.replace(/(.{4})/g, '$1 ').trim()
    }
    if (name === 'expiry') {
      value = value.replace(/\D/g, '').slice(0, 4)
      if (value.length > 2) value = value.slice(0, 2) + ' / ' + value.slice(2)
    }
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 3)
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === 'folks10') setCouponApplied(true)
    else alert('Coupon tidak valid')
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const activeBank = banks.find(b => b.id === selectedBank)

  return (
    <div className="payment-layout">
      {/* ===== LEFT: Method Selector + Summary Card ===== */}
      <div className="payment-left">
        <h2 className="payment-section-title">Pilih Metode Pembayaran</h2>

        <div className="method-list">
          {paymentMethods.map(method => (
            <div
              key={method.id}
              className={`method-card ${payMethod === method.id ? 'method-card--selected' : ''}`}
              onClick={() => setPayMethod(method.id)}
            >
              <div className="method-card__left">
                <div className="method-card__logo">{method.icon}</div>
                <span>{method.label}</span>
              </div>
              <div className={`method-card__radio ${payMethod === method.id ? 'method-card__radio--active' : ''}`}>
                {payMethod === method.id && <div className="method-card__radio-dot" />}
              </div>
            </div>
          ))}
        </div>

        <SummaryCard plan={plan} total={total} couponApplied={couponApplied} />
      </div>

      {/* ===== RIGHT: Payment Detail ===== */}
      <div className="payment-right">

        {/* --- QRIS --- */}
        {payMethod === 'qris' && (
          <div className="qris-wrap">
            <h2 className="payment-section-title">Bayar dengan QRIS</h2>
            <p className="payment-section-desc">
              Scan QR code di bawah menggunakan aplikasi e-wallet atau mobile banking kamu.
            </p>

            <div className="qris-box">
              <div className="qris-box__inner">
                <QRCode />
              </div>
              <p className="qris-box__label">FOLKS Institute</p>
              <p className="qris-box__amount">{formatRupiah(total)}</p>
            </div>

            <p className="qris-note">
              QR code berlaku selama <strong>15 menit</strong>. Setelah pembayaran, konfirmasi akan dikirim ke email kamu.
            </p>

            <button className="payment-btn-proceed" onClick={() => alert('Menunggu konfirmasi...')}>
              Saya Sudah Bayar
            </button>
          </div>
        )}

        {/* --- Bank Transfer --- */}
        {payMethod === 'transfer' && (
          <div className="transfer-wrap">
            <h2 className="payment-section-title">Transfer Bank</h2>
            <p className="payment-section-desc">
              Pilih bank tujuan dan transfer sesuai jumlah yang tertera.
            </p>

            <div className="bank-list">
              {banks.map(bank => (
                <div
                  key={bank.id}
                  className={`bank-item ${selectedBank === bank.id ? 'bank-item--active' : ''}`}
                  onClick={() => setSelectedBank(bank.id)}
                >
                  {bank.name}
                </div>
              ))}
            </div>

            <div className="bank-detail">
              <div className="bank-detail__row">
                <span className="bank-detail__label">Bank</span>
                <span className="bank-detail__value">{activeBank?.name}</span>
              </div>
              <div className="bank-detail__row">
                <span className="bank-detail__label">Atas Nama</span>
                <span className="bank-detail__value">{activeBank?.atas}</span>
              </div>
              <div className="bank-detail__row">
                <span className="bank-detail__label">No. Rekening</span>
                <div className="bank-detail__copy-row">
                  <span className="bank-detail__value bank-detail__value--mono">{activeBank?.no}</span>
                  <button className="bank-detail__copy-btn" onClick={() => handleCopy(activeBank?.no)}>
                    {copied ? '✓ Tersalin' : 'Salin'}
                  </button>
                </div>
              </div>
              <div className="bank-detail__row bank-detail__row--total">
                <span className="bank-detail__label">Jumlah Transfer</span>
                <span className="bank-detail__value bank-detail__value--green">{formatRupiah(total)}</span>
              </div>
            </div>

            <p className="transfer-note">
              ⚠️ Transfer tepat sesuai jumlah di atas. Konfirmasi akan diverifikasi dalam <strong>1x24 jam</strong>.
            </p>

            <button className="payment-btn-proceed" onClick={() => alert('Terima kasih! Tim kami akan memverifikasi.')}>
              Saya Sudah Transfer
            </button>
          </div>
        )}

        {/* --- Kartu Debit/Kredit --- */}
        {payMethod === 'card' && (
          <div className="card-wrap">
            <h2 className="payment-section-title">Start Your Consultation</h2>
            <p className="payment-section-desc">
              To finalize your booking, kindly complete your payment information below using a valid credit or debit card.
            </p>

            <div className="final-form">
              <div className="final-form__group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nama sesuai kartu"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="final-form__group">
                <label>Card Number</label>
                <div className="final-form__card-wrap">
                  <div className="final-form__card-icon">
                    <svg width="32" height="22" viewBox="0 0 48 32">
                      <circle cx="18" cy="16" r="12" fill="#EB001B" opacity="0.9"/>
                      <circle cx="30" cy="16" r="12" fill="#F79E1B" opacity="0.9"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={form.cardNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="final-form__row">
                <div className="final-form__group">
                  <label>Expiry date</label>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM / YY"
                    value={form.expiry}
                    onChange={handleChange}
                  />
                </div>
                <div className="final-form__group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="•••"
                    value={form.cvv}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="final-form__group">
                <label>Discount Coupon (Optional)</label>
                <div className="final-form__coupon">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                  />
                  <button type="button" onClick={handleApplyCoupon}>Apply</button>
                </div>
              </div>

              <button
                type="button"
                className="payment-btn-proceed"
                onClick={(e) => { e.preventDefault(); alert('Pembayaran berhasil!') }}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default FinalPayment