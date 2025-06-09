import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';

import Checkbox from '../Checkbox';

import passwordGif from '../../assets/gif/password.gif';
import copyIcon from '../../assets/icons/copy.svg';
import refreshIcon from '../../assets/icons/refresh.svg';

import './index.css'

interface Options {
  password: string;
  options: {
    lowerCase: boolean;
    upperCase: boolean;
    numbers: boolean;
    special: boolean;
  }
}

const PasswordGenerator = () => {

  const letterLower = "abcdefghijklmnopqrstuvwxyz";
  const letterUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!@#$%^&*()";

  const [passwordLength, setPasswordLength] = useState<number>(10);
  const [results, setResults] = useState<Options>({
    password: "",
    options: {
      lowerCase: false,
      upperCase: false,
      numbers: false,
      special: false
    }
  });
  const [click, setClick] = useState<boolean>(false);
  const [strength, setStrength] = useState<string>("");

  const onChangePasswordLength = (value: any) => {
    setPasswordLength(value);
  }

  const copyClipBoard = () => {
    setClick(true);
    if (results.password.length > 0) {
      navigator.clipboard.writeText(results.password);
    }
    setTimeout(() => setClick(false), 1000);
  }

  const handleSelection = (value: boolean, name: string) => {
    setResults(prev => ({ ...prev, options: { ...prev.options, [name]: !value } }));
  }

  const generatePassword = () => {
    let randomChar: string = "";

    if (Object.values(results.options).every(value => value === false)) {
      setResults(prev => ({ ...prev, password: "" }))
      return;
    }

    if (results.options.lowerCase) randomChar += letterLower;
    if (results.options.upperCase) randomChar += letterUpper;
    if (results.options.special) randomChar += special;
    if (results.options.numbers) randomChar += numbers;

    let newPassword: string = ""
    for (let i = 0; i < passwordLength; i++) {
      newPassword += randomChar[Math.floor(Math.random() * randomChar.length)];
    }
    setResults(prev => ({ ...prev, password: newPassword }));
  }

  const checkStrength = () => {
    let score = 0;

    if (results.password.match(/[a-z]/)) score++;
    if (results.password.match(/[A-Z]/)) score++;
    if (results.password.match(/[!@#$%^&*()]/)) score++;
    if (results.password.match(/[0-9]/)) score++;

    if (score === 4) setStrength("Strong");
    else if (score === 3) setStrength("Medium");
    else setStrength("Weak")
  }

  useEffect(() => {
    checkStrength();
  }, [results.password]);


  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Ensure online account safety by creating strong and secure passwords
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="your password" value={results.password} />
          <img src={refreshIcon} alt="refresh the password" onClick={generatePassword} />
        </div>
        <button className="copy-btn" onClick={copyClipBoard} >
          <img src={copyIcon} alt="copy password" />
          {!click ? "Copy" : "Copied"}
        </button>
      </div>
      <span className="fw-500">{strength}</span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={8}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox id="upperCase" label="Uppercase" checked={results.options.upperCase} name="upperCase" onChange={() => handleSelection(results.options.upperCase, "upperCase")} />
        <Checkbox id="lowerCase" label="Lowercase" checked={results.options.lowerCase} name="lowerCase" onChange={() => handleSelection(results.options.lowerCase, "lowerCase")} />
        <Checkbox id="numbers" label="Numbers" checked={results.options.numbers} name="numbers" onChange={() => handleSelection(results.options.numbers, "numbers")} />
        <Checkbox
          id="special chars"
          label="Special Characters"
          checked={results.options.special}
          name="special"
          onChange={() => handleSelection(results.options.special, "special")}
        />
      </div>
    </div>
  )
}

export default PasswordGenerator
