import React, { useState, useEffect } from "react";
import { FcPlus } from "react-icons/fc";
import { FaTrashCan } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import todo from '../images/todo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// to get the data from local storage
const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  console.log(list);
  if (list) {
    return JSON.parse(list);
  }
  else {
    return [];
  }
}

const Todo = () => {
  const [inputText, setInputText] = useState('');
  const [allData, setAllData] = useState(getLocalItems);
  const [action, setAction] = useState("")
  const [editedIndex, setEditedIndex] = useState()

  console.log(inputText);

  // adding data to local storage
  // JSON.stringify() used to wrap array into string
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(allData));
  }, [allData]);

  const addNewItem = () => {
    if (!inputText) {
    }
    else if (inputText.length < 3) {
      toast.warn('Word at least contain three letters', { position: 'top-center' });
    }
    else {
      if (action === "edit") {
        allData.splice(editedIndex, 0, inputText)
        setAllData(allData)
        console.log("hi" + allData)
        setAction("")
        setInputText('');
      }
      else {
        setAllData([inputText, ...allData]);
        setInputText('');
      }
    }
  }

  const storeTextChanges = (event) => {
    const inputText = event.target.value;
    if (inputText.length <= 50) {
      setInputText(inputText);
    }
    else {
      if (action === "add") {
        setAction("")
        toast.error('Limit exceeded :- Max 50 letters accepted', { position: 'top-center' });
      }
      else
        return
    }
  }


  const deleteItem = (id) => {
    console.log(id);
    setAllData((allData) => {
      return allData.filter((curElem, index) => {
        return id !== index;
      })
    })
  }
  const removeAll = () => {
    setAllData([]);
  }

  const Edit = (id) => {
    console.log(id);
    setEditedIndex(id)
    setAction("edit");
    setInputText(allData[id]);
    deleteItem(id);
  }

  return (
    <>
      <ToastContainer />
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt='todologo' />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className='addItems'>
            <input type='search' placeholder='✍️ Add Items...' onChange={storeTextChanges} value={inputText} />
            <FcPlus className='plusIcon' onClick={addNewItem} />
          </div>
          <div className="showItems" >
            {
              allData.map((curElem, index) => {
                return (
                  <div className="eachItem" key={index}>
                    <span>{curElem}</span>
                    <FaTrashCan className='trash' onClick={() => deleteItem(index)} />
                    <FaPencil className='edit' onClick={() => Edit(index)} />
                  </div>
                )
              })
            }
          </div>
          <div className="button">
            <button className="btn" onClick={removeAll}>Remove All</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo;
