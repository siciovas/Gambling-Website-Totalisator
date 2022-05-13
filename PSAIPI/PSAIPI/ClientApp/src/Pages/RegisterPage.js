import React, { useState } from 'react'

function LoginPage(Login) {

    const [details, setDetails] = useState({ email: "", password: "" });

    const submitHandler = e => {
        e.preventDefault();
    }


    return (
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Registration</h2>
                {/* Error */}

                <div className='form-group'>
                    <label htmlFor='text'>Name</label>
                    <input type='name' name='name' id='name' onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name} />
                </div>

                <div className='form-group'>
                    <label htmlFor='text'>Surname</label>
                    <input type='surname' name='surname' id='surname' onChange={e => setDetails({ ...details, surname: e.target.value })} value={details.surname} />
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                </div>

                <div className='form-group'>
                    <label htmlFor='date'>Born</label>
                    <input type='text' name='born' id='born' onChange={e => setDetails({ ...details, born: e.target.value })} value={details.born} />
                </div>

                <div className='form-group'>
                    <label htmlFor='number'>Identity code</label>
                    <input type='text' name='identity' id='identity' onChange={e => setDetails({ ...details, identity: e.target.value })} value={details.identity} />
                </div>
                
                <div className='form-group'>
                    <label htmlFor='number'>City</label>
                    <input type='text' name='city' id='city' onChange={e => setDetails({ ...details, city: e.target.value })} value={details.city} />
                </div>

                <div className='form-group'>
                    <label htmlFor='number'>Postal code</label>
                    <input type='text' name='postalcode' id='postalcode' onChange={e => setDetails({ ...details, postalcode: e.target.value })} value={details.postalcode} />
                </div>

                <div className='form-group'>
                    <label htmlFor='number'>Phone number</label>
                    <input type='number' name='number' id='number' onChange={e => setDetails({ ...details, number: e.target.value })} value={details.number} />
                </div>

                <input type='submit' className='btn btn-primary' value='Prisijungti' />

            </div>
        </form>
    )
}

export default LoginPage;