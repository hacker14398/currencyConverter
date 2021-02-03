import React, {useEffect, useState} from 'react'
import './App.css';
import CurrencyRow from './CurrencyRow';

const url = 'https://api.exchangeratesapi.io/latest'
function App() {
  const [currencyOptions, setcurrencyOptions] = useState([]);
  const [fromCurrency, setfromCurrency] = useState();
  const [toCurrency, settoCurrency] = useState();
  const [exchangeRate, setexchangeRate] = useState()
  const [amount, setamount] = useState(1);
  const [amountInFromCurrency, setamountInFromCurrency] = useState(true);
  let toamount, fromamount
  if(amountInFromCurrency){
    fromamount = amount
    toamount = amount*exchangeRate
  } else{
    toamount = amount
    fromamount = amount/exchangeRate
  }
  useEffect(()=>{
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      const firstcurrency = Object.keys(data.rates)[0]
      setcurrencyOptions([data.base, ...Object.keys(data.rates)])
      setfromCurrency(data.base);
      settoCurrency(firstcurrency);
      setexchangeRate(data.rates[firstcurrency]);
    })
  }, [])
  useEffect(()=>{
    if(fromCurrency && toCurrency){
      fetch(`${url}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setexchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])


  function handlefromAmountChange(e){
    setamount(e.target.value)
    setamountInFromCurrency(true)
  }
  function handletoAmountChange(e){
    setamount(e.target.value)
    setamountInFromCurrency(false)
  }
  return (
    <div>
      <h1>Convert</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions} 
        selectedcurrency={fromCurrency}
        onChangeCurrency={e => setfromCurrency(e.target.value)}
        amount={fromamount}
        onChangeAmount={handlefromAmountChange}
      />
      <div className="equals">=</div>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedcurrency={toCurrency}
        onChangeCurrency={e => settoCurrency(e.target.value)}
        amount={toamount}
        onChangeAmount={handletoAmountChange}
      />
      
    </div>
  );
}

export default App;
