import { useEffect, useState } from "react";
// import { useState } from "react";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Invoice from "./Invoice";
import InvoiceContent from "./InvoiceContent"
import { BrowserRouter, Routes, Route } from "react-router-dom";


const Home = () =>{

    // Load theme from localStorage or default to "light"
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

     // Save theme to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);
    
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return (
        <main className={`w-full ${theme === "dark" ? "bg-[#0c0E16]" : "bg-[#F8F8FB]"}  overflow-y-auto h-screen flex flex-col items-center xl:items-start xl:flex-row  xl:justify-between `}>
            {/* Side panel */}
            <div className="z-20 w-[100%] xl:fixed xl:w-[5%] h-[100px] xl:h-screen bg-[#252945] xl:rounded-tr-3xl xl:rounded-br-3xl flex flex-row xl:flex-col justify-between">
                <div className="xl:w-[100%] p-6 lg:p-8 bg-[#7c5DFA] rounded-tr-3xl rounded-br-3xl flex justify-center items-center">
                    <img src="/assets/logo1.png" className="scale-75 lg:scale-150" alt="" />
                </div>
                <div className="flex flex-row xl:flex-col items-center">
                    <div className="w-[100%] flex justify-center items-center pr-8 xl:pr-0 xl:pb-8">
                        <button
                            onClick={toggleTheme}
                        >
                            <span className="text-[20px]  ">
                                <FontAwesomeIcon icon={faMoon} className="text-[#888EB0] " />
                            </span>
                        </button>
                    </div>
                    <div className="w-[100%] h-[100%] xl:h-auto border-l-[1px] border-r-0 border-[#7c5DFA] xl:border-t-[1px] border-t-gray-200 p-8 z-10 bg-transparent">
                        <img src="/assets/Oval.png" className="scale-150" alt="" />
                    </div>
                </div>
            </div>



            {/* Main content */}
            <div className="w-[95%]  mt-12 xl:mt-0">
                <div className="w-[100%] xl:w-[70%] py-8 mx-auto">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Invoice theme={theme}/>} />
                            <Route path="/invoice/:id" element={<InvoiceContent theme={theme}/>} />
                        </Routes>
                    </BrowserRouter>
                </div> 
            </div>
        </main>
    );
}

export default Home;