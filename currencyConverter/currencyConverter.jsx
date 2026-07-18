const { useState, useMemo } = React;

export function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const RATES = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.25,
  };

  const CURRENCY_SYMBOLS = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  };

  const currencies = ['USD', 'EUR', 'GBP', 'JPY'];

  // Memoize the base conversion (to USD) based only on amount and fromCurrency
  const usdAmount = useMemo(() => {
    if (isNaN(amount) || amount === '') return 0;
    const amountNum = parseFloat(amount);
    return amountNum / RATES[fromCurrency];
  }, [amount, fromCurrency]);

  // Calculate the final conversion - this updates when toCurrency changes
  // but doesn't recalculate the memoized usdAmount
  const convertedAmount = usdAmount * RATES[toCurrency];

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value === '' ? '' : parseFloat(value));
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const formattedAmount = convertedAmount !== 0 && !isNaN(convertedAmount)
    ? `${convertedAmount.toFixed(2)} ${toCurrency}`
    : '0.00 ' + toCurrency;

  return (
    <div style={{
      maxWidth: '400px',
      margin: '20px auto',
      padding: '24px 20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fff',
      borderRadius: '12px',
      border: '1px solid #ddd',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    }}>
      <h2 style={{
        fontSize: '22px',
        fontWeight: 'bold',
        margin: '0 0 20px 0',
        color: '#222',
        textAlign: 'center',
      }}>
        Currency Converter
      </h2>
      
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="amount" style={{
          display: 'block',
          marginBottom: '4px',
          fontWeight: 'bold',
          fontSize: '14px',
          color: '#333',
        }}>
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            boxSizing: 'border-box',
            backgroundColor: '#fafafa',
          }}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="fromCurrency" style={{
          display: 'block',
          marginBottom: '4px',
          fontWeight: 'bold',
          fontSize: '14px',
          color: '#333',
        }}>
          From
        </label>
        <select
          id="fromCurrency"
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            backgroundColor: '#fafafa',
            boxSizing: 'border-box',
          }}
        >
          {currencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="toCurrency" style={{
          display: 'block',
          marginBottom: '4px',
          fontWeight: 'bold',
          fontSize: '14px',
          color: '#333',
        }}>
          To
        </label>
        <select
          id="toCurrency"
          value={toCurrency}
          onChange={handleToCurrencyChange}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            backgroundColor: '#fafafa',
            boxSizing: 'border-box',
          }}
        >
          {currencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>

      <div style={{
        padding: '14px',
        backgroundColor: '#f0f4f8',
        borderRadius: '6px',
        textAlign: 'center',
        border: '1px solid #dce5ef',
      }}>
        <div style={{
          fontSize: '13px',
          color: '#555',
          marginBottom: '2px',
        }}>
          Converted Amount
        </div>
        <div style={{
          fontSize: '26px',
          fontWeight: 'bold',
          color: '#1a1a1a',
        }}>
          {formattedAmount}
        </div>
      </div>

      <div style={{
        marginTop: '12px',
        fontSize: '12px',
        color: '#888',
        textAlign: 'center',
      }}>
        1 USD = {RATES.EUR} EUR · {RATES.GBP} GBP · {RATES.JPY} JPY
      </div>
    </div>
  );
}