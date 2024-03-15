import { useState,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {

  const [length ,setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password,setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const copyPasswordTopClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password);
  },[password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str+="0123456789"
    if(charAllowed) str+= "~!@#$%^&*()-_+={}[]|<>?/"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char);
    }
    setPassword(pass);


  },[length,numberAllowed,charAllowed,setPassword]);

  useEffect(() => {
    passwordGenerator();
  },[length,numberAllowed,charAllowed,setPassword])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>
          Password generator
        </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input
            ref={passwordRef}
            type='text'
            value={password}
            className='outline-none w-full py-2 px-3 '
            readOnly
            placeholder='password'
            />
            <button
            onClick={copyPasswordTopClipboard}
            className='outline bg-blue-700 text-white px-3 py-1 shrink-0 hover:bg-blue-800 active:bg-blue-950'
            >
              Copy
            </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type='range'
            min={6}
            max={100}
            value={length}
            onChange={(e) => {setLength(e.target.value)}}
            className='cursor-pointer'
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
                type='checkbox'
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              /> 
              <label htmlFor='characterInput'>Characters</label>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            /> 
            <label htmlFor='characterInput'>Numbers</label>
          </div>
        </div> 
      </div>
    </>
  )
}

export default App
