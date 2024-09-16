import React, { useState, useCallback, useEffect, useRef } from 'react'

const App = () => {

  const [password, setPassword] = useState('');
  const [range, setRange] = useState(6);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);

  const passwordRef = useRef("")


  const generatPassword = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSUVTWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()-_+=[]{}~`<>/?/"

    for (let i = 1; i <= range; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [charAllow, range, numberAllow, setPassword]);

  const handleCopyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    generatPassword()
  }, [range, charAllow, numberAllow, generatPassword])


  return (
    <div className='bg-gradient-to-r from-blue-900 to-purple-900 h-screen flex items-center justify-center'>
      <div className="bg-zinc-800 w-full max-w-lg rounded-lg shadow-lg p-6">
        <h1 className='text-3xl text-white font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-md'>
          Password Generator
        </h1>

        <div className="mt-8 bg-white p-5 rounded-md shadow-md">
          <div className='flex'>
            <input
              type="text"
              ref={passwordRef}
              value={password}
              className='bg-gray-200 p-3 w-full rounded-l-lg outline-none font-semibold text-gray-700'
              placeholder='Generated Password'
              readOnly
            />
            <button
              onClick={handleCopyPassword}
              className='bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-3 rounded-r-lg font-semibold transition duration-300 hover:from-indigo-600 hover:to-purple-600'>
              Copy
            </button>
          </div>

          <div className="mt-6 flex flex-col space-y-4">
            <div className="flex items-center">
              <input
                type="range"
                min={6}
                max={50}
                value={range}
                id='range'
                onChange={(e) => setRange(e.target.value)}
                className="w-3/4 accent-indigo-500"
              />
              <label htmlFor="range" className='ml-4 text-orange-400 font-semibold'>
                Length: {range}
              </label>
            </div>

            <div className="flex items-center gap-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={numberAllow}
                  id='number'
                  onChange={(e) => setNumberAllow(e.target.checked)}
                  className="accent-indigo-500"
                />
                <label htmlFor="number" className='ml-2 text-zinc-800 font-semibold'>
                  Include Numbers
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={charAllow}
                  id='charAllow'
                  onChange={(e) => setCharAllow(e.target.checked)}
                  className="accent-indigo-500"
                />
                <label htmlFor="charAllow" className='ml-2 text-zinc-800 font-semibold'>
                  Include Special Characters
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default App