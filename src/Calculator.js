import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Typography } from '@material-ui/core';

const Calculator = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [dayError, setDayError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);


  const calculateAge = () => {

    if (day < 1 || day > 31) {
      setDayError(true);
    } else {
      setDayError(false);
    }
    if (month < 1 || month > 12) {
      setMonthError(true);
    } else {
      setMonthError(false);
    }
    if (birthDate.getFullYear() > today.getFullYear()) {
      setErrorMessage('Oh, I see you have entered a year in the future. Im afraid I cannot help you, Mr.Time Traveler.Perhaps you could try a different calculator that caters to your extraordinary temporal abilities ? ;) ');
      setAge(null);
      return;
    }
    if (
      birthDate.getDate() !== parseInt(day) ||
      birthDate.getMonth() !== parseInt(month) - 1 ||
      birthDate.getFullYear() !== parseInt(year)
    ) {
      setErrorMessage('Oh wow, looks like you have discovered a new calendar system! Unfortunately, my calculations are limited to Earth days, years and months. :/');
      setAge(null);
    } else {
      const ageInMilliseconds = today.getTime() - birthDate.getTime();
      const years = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor(
        (ageInMilliseconds % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
      );
      const days = Math.floor(
        ((ageInMilliseconds % (1000 * 60 * 60 * 24 * 365)) % (1000 * 60 * 60 * 24 * 30)) /
        (1000 * 60 * 60 * 24)
      );
      setAge({ years, months, days });
      setErrorMessage('');
    }
  };



  return (
    <div className='App-header'>
      <div className='card'>
        <div className='card-content'>
          <form noValidate autoComplete='off'>
            <div className='text-fields-container'>
              <div className='text-field-container'>
                <TextField
                  id='day'
                  type='number'
                  label='Day'
                  value={day}
                  onChange={(e) => setDay(e.target.value.replace(/\D/, '').slice(0, 2))}
                  variant='outlined'
                  margin='normal'
                  required
                  InputProps={{
                    style: {
                      borderColor: dayError ? 'red' : ''
                    }
                  }}
                  error={day !== '' && (day < 1 || day > 31)}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 2,
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      calculateAge();
                    }
                  }}
                />
                {day !== '' && day < 1 || day > 31 ? (
                  <Typography variant='subtitle2' color='error'>
                    Must be a valid day
                  </Typography>
                ) : ''}

              </div>
              <div className='text-field-container'>

                <TextField
                  id='month'
                  label='Month'
                  value={month}
                  onChange={(e) => setMonth(e.target.value.replace(/\D/, '').slice(0, 2))}
                  variant='outlined'
                  margin='normal'
                  required
                  InputProps={{
                    style: {
                      borderColor: monthError ? 'red' : ''
                    }
                  }}
                  error={month !== '' && (month < 1 || month > 12)}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 2,
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      calculateAge();
                    }
                  }}

                />
                {month !== '' && (month < 1 || month > 12) ? (
                  <Typography variant='subtitle2' color='error'>
                    Must be a valid month
                  </Typography>
                ) : ''}

              </div>
              <div className='text-field-container'>

                <TextField
                  id='year'
                  label='Year'
                  value={year}
                  onChange={(e) => setYear(e.target.value.replace(/\D/, '').slice(0, 4))}
                  variant='outlined'
                  margin='normal'
                  required
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 4,
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      calculateAge();
                    }
                  }}
                  error={birthDate.getFullYear() > today.getFullYear()}

                />
                {birthDate.getFullYear() > today.getFullYear() ? (
                  <Typography variant='subtitle2' color='error'>
                    Must be in the past
                  </Typography>
                ) : ''}
              </div>

            </div>

            <div className='button'>

            <hr className='line' />
              <div className='my-button' style={{ color: 'white', justifyContent: "center" }}>
                <ArrowDownwardIcon onClick={calculateAge} />
              </div>
            </div>

            {age ? (
              <div className='text'>
                <b style={{ color: 'rgb(138 42 238)' }} >You are : </b>  <br />
                <b style={{ color: 'rgb(138 42 238)' }} >{age.years}</b> <b>years</b>  <br />
                <b style={{ color: 'rgb(138 42 238)' }}>{age.months}</b> <b>months</b><br />
                <b style={{ color: 'rgb(138 42 238)' }}>{age.days}</b> <b>days old</b>
              </div>
            ) : (errorMessage == '') ?
              <div div className='text'>
                <b style={{ color: 'rgb(138 42 238)' }} >Please enter your Date Of Birth </b>  <br />

              </div>
              : ''}
            {errorMessage && <div>{errorMessage}</div>}
          </form>
        </div></div>
    </div>
  );
};

export default Calculator;
