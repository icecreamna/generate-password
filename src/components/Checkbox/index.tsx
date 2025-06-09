import React from 'react';
import './index.css'

interface Checkbox {
  id: string;
  label: string;
  name: string;
  checked: boolean;
  onChange?: () => void
}

const Checkbox: React.FC<Checkbox> = ({ id, label, checked, name, onChange }) => {
  return (
    <div className="checkbox-wrapper">
      <input id={id} type="checkbox" checked={checked} name={name} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default Checkbox
