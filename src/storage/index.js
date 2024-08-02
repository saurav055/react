import storage from 'redux-persist/lib/storage' // defaults to localStorage for web



const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await storage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  }


const getData = async (key) => {
    try {
      const value = await storage.getItem(key)
      if(value !== null) {
        // value previously stored
        return JSON.parse(value)
      }
    } catch(e) {
      // error reading value
    }
  }
  
  export {storeData,getData}