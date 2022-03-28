import React, { useState } from 'react'

function LoginPage(Login) {

    const [details, setDetails] = useState({ email: "", password: "" });

    const submitHandler = e => {
        e.preventDefault();
    }


    return (
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Prisijungti</h2>
                {/* Error */}
                <div className='form-group'>
                    <label htmlFor='email'>El. paštas</label>
                    <input type='email' name='email' id='email' onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Slaptažodis</label>
                    <input type='password' name='password' id='password' onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                </div>
                <input type='submit' value='Prisijungti' />

            </div>
        </form>
    )
}

export default LoginPage;