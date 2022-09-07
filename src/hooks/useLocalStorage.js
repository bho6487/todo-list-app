import { useState, useEffect } from "react";

function getSavedValue(key, initialValue) {
  //get whatever we have stored at the "key" location and convert it to JSON
  const savedValue = JSON.parse(localStorage.getItem(key));
  //if we have something stored, return that saved value
  if (savedValue) return savedValue;

  //useState can take a function as it's input
  //we need to check if the initial value is a function and call it
  if (initialValue instanceof Function) return initialValue();
  //if no saved value and not a function, return initial value
  return initialValue;
}

export default function useLocalStorage(key, initialValue) {
  //using function because we don't want to always call json.parse and call localstorage
  //we only do this once when our component loads to get the initial value
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  //updating and saving our values to localStorage
  //run useEffect everytime we make an update to our value
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
