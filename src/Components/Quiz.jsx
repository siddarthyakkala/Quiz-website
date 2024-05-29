import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../assets/data'
const Quiz = () => {
    let [index,setIndex]=useState(0)
    let [question,setQuestion]=useState(data[index])
    let [lock,setLock]=useState(false)
    let [score,setScore]=useState(0)
    let [result,setResult]=useState(false)
    let option1=useRef(null)
    let option2=useRef(null)
    let option3=useRef(null)
    let option4=useRef(null)
    let option_array=[option1,option2,option3,option4]
    const checkAns=(e,ans)=>{
        if(lock===false){
            if(question.answer===ans){
                e.target.classList.add("correct")
                setScore(++score)
                setLock(true)
            }
            else{
                e.target.classList.add("wrong")
                setLock(true)
                option_array[question.answer-1].current.classList.add("correct")
            }
        }
    }

    const next=()=>{
        if(lock===true){
            if(index===data.length-1){
                setResult(true)
                return 0;
            }
        setIndex(++index);
        setQuestion(data[index]);
        setLock(false);
        option_array.map((option)=>{
            option.current.classList.remove("wrong");
            option.current.classList.remove("correct");
            return null;
        })
        }
    }
    const startAgain=()=>{
        setIndex(0)
        setQuestion(data[index])
        setLock(false)
        setScore(0)
        setResult(false)
    }
  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr></hr>
        {result?<>
            <h1 className='result'>You scored {score} out of {data.length}</h1>
            <button onClick={startAgain} className='index'>Start Again</button>
        </>:<>
        <h2>{index+1}. {question.question}</h2>
        <ul>
            <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
            <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
            <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
            <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
        </ul>
        <button onClick={next} className='btn'>Next</button>
        <div className="index">{index+1} out of 5 questions</div></>}
    </div>
  )
}

export default Quiz