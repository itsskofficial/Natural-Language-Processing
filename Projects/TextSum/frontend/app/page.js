"use client"

import Image from "next/image"
import { useState } from "react"

const Home = () => {

  const [text, setText] = useState("")
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const handleOnChange = (e) => {
    setText(e.target.value)
    } 
    
  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setSubmit(true)

    try {
      const response = await fetch("https://textsum-0df7.onrender.com/summarize", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          text: text
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
  
      if (response.ok) {
        const data = await response.json()
        setResult(data.result)
      }
      else {
        throw new Error(response.error.message)
      }
    }

    catch (error) {
      setError(error.message)
    }

    finally {
      setTimeout(() => {
        setSubmit(false)
        setError(null)
        setResult(null)
      }, 5000)
    }
  }

  return (
    <div className="flex flex-col lg:gap-[100px] sm:gap-[75px] xs:gap-[50px] items-center justify-center">
      <div className="flex items-center justify-center lg:gap-[50px] sm:gap-[35px] xs:gap-[20px]">
        <Image src="/logo.svg" width={0} height={0} className="lg:w-[100px] sm:w-[75px] xs:w-[50px]" alt="SpamGuard Logo" />
        <h1 className="font-Montserrat font-semibold lg:text-[50px] sm:text-[35px] xs:text-[20px] text-white">
          TextSum
        </h1>
      </div>
      <h2 className="font-Poppins font-semibold text-center lg:text-lg sm:text-base xs:text-sm text-white">
        Enter a text below and click the summarize button
      </h2>
      <div className="flex items-center justify-center h-[200px] lg:w-[75%] sm:w-[85%] xs:w-[95%] bg-gradient-to-b from-pink-500 via-red-500 to-yellow-500 lg:p-2 sm:p-1.5 xs:p-1 rounded-[12px] ">
        <textarea name="text-input" type="text" onChange={handleOnChange} className="h-full w-full bg-gray-800 rounded-[12px] lg:p-[20px] sm:p-[15px] xs:p-[10px] font-Quicksand font-normal lg:text-lg sm:text-base xs:text-sm text-white" placeholder="You have won $7000. Click on the link below to get the prize"/> 
      </div>
        <button type="submit" onClick={handleSubmit} className="bg-gradient-to-b from-pink-500 via-red-500 to-yellow-500 lg:px-[40px] sm:px-[30px] xs:px-[20px] lg:py-[20px] sm:py-[15px] xs:py-[10px] rounded-[12px] font-Quicksand font-semibold lg:text-[25px] sm:text-[20px] xs:text-[15px] text-white">
          {submit ? "Summarizing..." : "Submit"}
        </button>
        <div className="flex items-center justify-center h-[200px] lg:w-[75%] sm:w-[85%] xs:w-[95%] bg-gradient-to-b from-pink-500 via-red-500 to-yellow-500 lg:p-2 sm:p-1.5 xs:p-1 rounded-[12px] ">
              <textarea name="text-input" type="text" className="h-full w-full bg-gray-800 rounded-[12px] lg:p-[20px] sm:p-[15px] xs:p-[10px] font-Quicksand font-normal lg:text-lg sm:text-base xs:text-sm text-white"
                  value={error !== null ? (
          {error}
         ) : result !== null ? (
            {result}
        ) : (
            "Summarized Text"
        )
      }/> 
        </div>
    </div>
  )
}

export default Home