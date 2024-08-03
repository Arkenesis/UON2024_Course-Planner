import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState( JSON.parse(localStorage.getItem("user")) || null );

  const login = async (inputs) => {
    try{
      const { data } = await axios.post("http://localhost:8080/users/login", inputs);
      const { data: program } = await axios.get("http://localhost:8080/pages/programs");
      setUser(data.message);
      if (data.message.firestore_data.courses) {
        let temp = JSON.parse(data.message.firestore_data.courses);
        setUser(prev => ({ ...prev, "courses": temp }));
      }
      if(program){
        setUser(prev => ({ ...prev, "program": [program.message] }));
      }
      return data;
    }
    catch(err){
      return { error: err };
    }
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));

  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, login  }}>
      {children}
    </UserContext.Provider>
  );
};

