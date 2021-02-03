import React from 'react'

export default function CurrencyRow(props) {
    const {currencyOptions, selectedcurrency, onChangeCurrency, onChangeAmount, amount} = props
    return (
        <div>
            <input type="number" className="input" value={amount} onChange={onChangeAmount} />
            <select value={selectedcurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option=>(
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
