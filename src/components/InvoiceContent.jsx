import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InvoiceContent = ({theme}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
        const found = invoices.find(inv => inv.id === id);
        setInvoice(found);
    }, [id]);

     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [showModal, setShowModal] = useState(false);
     const [invoiceDate, setInvoiceDate] = useState("");


// ...existing code...
const [billerAddress, setBillerAddress] = useState("");
const [billerCity, setBillerCity] = useState("");
const [billerPostCode, setBillerPostCode] = useState("");
const [billerCountry, setBillerCountry] = useState("");
const [clientName, setClientName] = useState("");
const [clientEmail, setClientEmail] = useState("");
const [clientAddress, setClientAddress] = useState("");
const [clientCity, setClientCity] = useState("");
const [clientPostCode, setClientPostCode] = useState("");
const [clientCountry, setClientCountry] = useState("");
const [paymentTerms, setPaymentTerms] = useState("1");
const [description, setDescription] = useState("");
const [items, setItems] = useState([]);
// ...existing code...



// ...existing code...
const addItem = () => {
    setItems([...items, { name: "", qty: 1, price: 0 }]);
};

const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
};

const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
};
// ...existing code...

    if (!invoice) return <div>Loading...</div>;

    const handleDelete = () => {
        const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
        const updatedInvoices = invoices.filter(inv => inv.id !== id);
        localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
        setShowDeleteModal(false);
        navigate("/"); // Redirect to invoice list

    };


    const handleMarkAsPaid = () => {
    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const updatedInvoices = invoices.map(inv =>
        inv.id === id ? { ...inv, status: "paid" } : inv
    );
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    setInvoice(prev => prev ? { ...prev, status: "paid" } : prev);
};



const handleEditSubmit = (e) => {
    e.preventDefault();
    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const updatedInvoices = invoices.map(inv =>
        inv.id === id
            ? {
                ...inv,
                senderAddress: billerAddress,
                senderCity: billerCity,
                senderPostCode: billerPostCode,
                senderCountry: billerCountry,
                name: clientName,
                email: clientEmail,
                clientAddress: clientAddress,
                clientCity: clientCity,
                clientPostCode: clientPostCode,
                clientCountry: clientCountry,
                paymentTerms: paymentTerms,
                description: description,
                duedate: invoiceDate,
                items: items,
            }
            : inv
    );
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    setInvoice(updatedInvoices.find(inv => inv.id === id));
    setShowModal(false);
};
   

    return (
        <div>
            <Link to="/">
                <div className="flex items-center gap-4 text-[20px] font-bold">
                    <span className={`${theme === "dark" ? "text-[#7C5DFA]" : "text-black"}`}>&#10094;</span>
                    <h2 className={`${theme === "dark" ? "text-white" : "text-black"}`}>Go Back</h2>
                </div>
            </Link>

            {/* Head */}
            <div className={`w-[100%] h-[80px]  rounded-xl mt-8 flex justify-between items-center ${theme === "dark" ? "bg-[#1E2139]" : "bg-white"}`}>
                <div className="flex items-center gap-4 p-4 md:pl-4 w-[100%] md:w-auto justify-between ">
                    <h2 className={`text-[17px] font-bold  ${theme === "dark" ? "text-[#888EB0]" : "text-black"}`}>Status</h2>
                    <div>
                        <div className={`w-[150px] rounded-xl h-[45px] flex justify-center items-center gap-2
                            ${invoice.status === "paid" ? "bg-[#33d69f1a]" : "bg-red-200"}`}>
                            <div className={`w-[8px] h-[8px] rounded-full 
                                ${invoice.status === "paid" ? "bg-[#33D69F]" : "bg-red-400"}`}></div>
                            <h2 className={`font-bold 
                                ${invoice.status === "paid" ? "text-[#33D69F]" : "text-red-400"}`}>
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="gap-4 pr-4 hidden md:flex">
                    <button 
                        onClick={() => {
                            setBillerAddress(invoice.billerAddress || "");
                            setBillerCity(invoice.billerCity || "");
                            setBillerPostCode(invoice.billerPostCode || "");
                            setBillerCountry(invoice.senderCountry || "");
                            setClientName(invoice.name || "");
                            setClientEmail(invoice.email || "");
                            setClientAddress(invoice.clientAddress || "");
                            setClientCity(invoice.clientCity || "");
                            setClientPostCode(invoice.clientPostCode || "");
                            setClientCountry(invoice.clientCountry || "");
                            setPaymentTerms(invoice.paymentTerms || "1");
                            setDescription(invoice.description || "");
                            setItems(invoice.items || []);
                            setInvoiceDate(invoice.invoiceDate || invoice.duedate || "");
                            setShowModal(true);
                        }}
                        className={`w-[90px] h-[47px] rounded-[50px] text-[16px] font-bold  ${theme === "dark" ? "bg-[#252945]" : "bg-white"} text-[#9277FF] hover:bg-[#DFE3FA]`}>Edit</button>
                    <button 
                        onClick={() => setShowDeleteModal(true)}
                        className="w-[110px] h-[47px] text-white rounded-[50px] text-[16px] font-bold bg-[#EC5757] hover:bg-[#ec5757c5]">Delete</button>
                    <button 
                        onClick={handleMarkAsPaid}
                        className="w-[150px] h-[47px] text-white rounded-[50px] text-[16px] font-bold bg-[#7C5DFA] hover:bg-[#9277FF]">Mark as paid</button>
                </div>
            </div>

            {/* Body */}
            <div className={`w-[100%] py-6  ${theme === "dark" ? "bg-[#1E2139] text-white" : "bg-white text-black"} mt-4 rounded-xl`}>
                {/* First section */}
                <div className="w-[100%] flex flex-col md:flex-row justify-between md:items-center p-6">
                    <div className="flex flex-col text-[20px] text-[#888EB0]">
                        <h2 className="font-bold">#<span className={` ${theme === "dark" ? "text-white" : "text-black"}`}>{invoice.id}</span></h2>
                        <h3 className="font-semibold text-[15px]">{invoice.description || "No Description"}</h3>
                    </div>
                    <div>
                        <h3 className="md:text-right mt-6 md:mt-0 text-[#888EB0] font-semibold text-[15px]">{invoice.billerAddress || ""}</h3>
                    </div>
                </div>

                {/* Second section */}
                <div className="w-[100%] flex md:gap-32 p-8">
                    <div className="gap-4 flex flex-col">
                        <div className="gap-4 flex flex-col ">
                            <h3 className="text-[#888EB0] text-[11px] md:text-[15px] font-semibold">Invoice Date</h3>
                            <h2 className="font-bold text-[17px]">{invoice.duedate}</h2>
                        </div>
                        <div>
                            <h3 className="text-[#888EB0] text-[11px] md:text-[15px] font-semibold">Payment Date</h3>
                            <h2 className="font-bold text-[17px]">{invoice.paymentDate || invoice.duedate}</h2>
                        </div>
                        <div className="gap-2 md:gap-4 flex flex-col md:hidden">
                            <h3 className="text-[#888EB0] text-[15px] font-semibold">Sent to</h3>
                            <h2 className="font-bold text-[17px]">{invoice.email || ""}</h2>
                        </div>
                    </div>
                    <div className="gap-4 flex flex-col">
                        <h3  className="text-[#888EB0] text-[15px] font-semibold">Bill To</h3>
                        <h2 className="font-bold text-[17px]">{invoice.name}</h2>
                        <h3 className="text-[#888EB0] text-[15px] font-semibold">{invoice.clientAddress || ""}</h3>
                    </div>
                    <div className="gap-4 flex-col hidden md:flex">
                        <h3 className="text-[#888EB0] text-[15px] font-semibold">Sent to</h3>
                        <h2 className="font-bold text-[17px]">{invoice.email || ""}</h2>
                    </div>
                </div>

                {/* Third section */}
                <div className={`w-[90%] flex flex-col justify-between pt-8 gap-8   ${theme === "dark" ? "bg-[#252945]" : "bg-[#F8F8FB]"} mx-auto rounded-xl `}>
                    <div className=" w-[100%] p-4">
                        <table className="table-auto w-[100%]">
                            <thead className="h-[60px]">
                                <tr className="">
                                    <td className="text-[18px] font-bold text-[#888EB0]">Item name</td>
                                    <td className="text-[18px] font-bold text-[#888EB0]">QTY.</td>
                                    <td className="text-[18px] font-bold text-[#888EB0]">Price</td>
                                    <td className="text-[18px] font-bold text-[#888EB0]">Total</td>
                                </tr>
                            </thead>
                            <tbody className="">
                            {/* Render all items */}
                                {invoice.items && invoice.items.length > 0 ? (
                                invoice.items.map((item, idx) => (
                                    <tr key={idx} className={`h-[50px]  ${theme === "dark" ? "text-white" : "text-[#888EB0]"}`}>
                                        <td className="text-[18px] font-bold ">{item.name}</td>
                                        <td className="text-[18px] font-bold ">{item.qty}</td>
                                        <td className="text-[18px] font-bold ">{item.price}</td>
                                        <td className="text-[18px] font-bold ">$ {(item.qty * item.price).toFixed(2)}</td>
                                    </tr>
                                ))
                                ) : (
                                <tr>
                                    <td colSpan={4} className="text-center text-[#888EB0]">No items</td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-[100%] flex justify-between items-center p-8 h-[70px] bg-black rounded-br-xl rounded-bl-xl">
                        <div className="text-[15px] font-semibold text-white">
                            <h2>Amount Due</h2>
                        </div>
                        <div>
                            <h2 className="text-[20px] font-bold text-white">{invoice.curency} {invoice.amount}</h2>
                        </div>
                    </div>
                </div>
            </div>

        {/* Delete alert prompt */}
            <div className={`${showDeleteModal ? "" : "hidden"}  w-[100%] h-[100vh] z-10 bg-opacity-55 absolute top-0 left-0 bg-black flex justify-center items-center `}>
                <div className={`w-[90%] md:w-[80%] xl:w-[30%] h-[200px] p-8 ${theme === "dark" ? "bg-[#1E2139]" : "bg-white"}  rounded-xl flex flex-col justify-center gap-8`}>
                    <div>
                        <h2 className={`${theme === "dark" ? "text-white" : "text-black"} text-[14px] font-bold`}>Confirm Deletion</h2>
                        <p className={`${theme === "dark" ? "text-[#888EB0]" : "text-black"} text-[12px] font-semibold`}>Are you sure you want to delete invoice {invoice.id}? This action cannot be undone. </p>
                    </div>
                    <div className="flex justify-end font-bold gap-4">
                        <button  
                            onClick={() => setShowDeleteModal(false)}
                            className={`w-[90px] h-[45px] rounded-[50px]  text-[#9277FF] ${theme === "dark" ? "bg-[#252945]" : "bg-[#F8F8FB]"} `}>Cancel</button>
                        <button
                            onClick={handleDelete}  
                            className="w-[90px] h-[45px] rounded-[50px] bg-[#EC5757] hover:bg-[#ec5757c5] ">Delete</button>
                    </div>
                </div>
            </div>

            {/* Mobile action bar */}
            <div className={`w-full h-[100px] gap-4 flex md:hidden items-center justify-center mt-6 ${theme === "dark" ? "bg-[#1E2139]" : "bg-white"}`}>
                <button 
                        onClick={() => {
                            setBillerAddress(invoice.billerAddress || "");
                            setBillerCity(invoice.billerCity || "");
                            setBillerPostCode(invoice.billerPostCode || "");
                            setBillerCountry(invoice.senderCountry || "");
                            setClientName(invoice.name || "");
                            setClientEmail(invoice.email || "");
                            setClientAddress(invoice.clientAddress || "");
                            setClientCity(invoice.clientCity || "");
                            setClientPostCode(invoice.clientPostCode || "");
                            setClientCountry(invoice.clientCountry || "");
                            setPaymentTerms(invoice.paymentTerms || "1");
                            setDescription(invoice.description || "");
                            setItems(invoice.items || []);
                            setInvoiceDate(invoice.invoiceDate || invoice.duedate || "");
                            setShowModal(true);
                        }}
                        className="w-[90px] h-[47px] rounded-[50px] text-[16px] font-bold bg-[#F8F8FB] text-[#9277FF] hover:bg-[#DFE3FA]">Edit</button>
                    <button 
                        onClick={() => setShowDeleteModal(true)}
                        className="w-[110px] h-[47px] text-white rounded-[50px] text-[16px] font-bold bg-[#EC5757] hover:bg-[#ec5757c5]">Delete</button>
                    <button 
                        onClick={handleMarkAsPaid}
                        className="w-[150px] h-[47px] text-white rounded-[50px] text-[16px] font-bold bg-[#7C5DFA] hover:bg-[#9277FF]">Mark as paid</button>
            </div>








             <div className={`${showModal ? "" : "hidden"} w-[100%] h-[100vh] bg-black absolute z-10 pt-4  xl:top-0 top-[8%]  left-0 bg-opacity-55 `}>
                    <div className={`w-[100%] md:w-[90%] xl:w-[45%] rounded-tr-xl rounded-br-xl h-[100%] overflow-auto  md:pl-[5%] ${theme === "dark" ? "bg-[#141625]" : "bg-white"}`}>
                        
                        <button  
                            onClick={() => setShowModal(false)}
                            className="md:hidden p-4"
                        >
                            <div className="flex items-center gap-4 text-[20px] font-bold">
                                <span>&#10094;</span>
                                <h2 className={`${theme === "dark" ? "text-white" : "text-black"}`}>Go Back</h2>
                            </div>
                        </button>
                        
                        <div className="p-4 text-[25px] font-bold">
                            <h2 className={`${theme === "dark" ? "text-white" : "text-black"}`}>
                                Edit {invoice.id ? `#${invoice.id}` : "Invoice"}
                            </h2>
                        </div>
                        <div>
                            
                            <form onSubmit={handleEditSubmit}>
                                <div className="w-[90%] mx-auto flex flex-col gap-4">
                                    <h2 className="text-[18px] font-bold text-[#9277FF]">Bill from</h2>
            
                                    <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Street Address</label>
                                    <input 
                                        type="text"  
                                        value={billerAddress}
                                        onChange={e => setBillerAddress(e.target.value)}
                                        className={`w-[100%] focus:border-[#9277FF] h-[50px] border-2 mt-2 text-font-semibold outline-none rounded-lg pl-3  ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}
                                    />
            
                                    <div className="w-[100%] gap-4 mt-4 flex justify-between items-center">
                                        <div>
                                            <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">City</label>
                                            <input 
                                                type="text"  
                                                value={billerCity}
                                                onChange={e => setBillerCity(e.target.value)}
                                                className={`border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%] ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Post code</label>
                                            <input 
                                                type="text" 
                                                 value={billerPostCode}
                                                onChange={e => setBillerPostCode(e.target.value)}
                                                className={`border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%] ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Country</label>
                                            <input 
                                                type="text"  
                                                value={billerCountry}
                                                onChange={e => setBillerCountry(e.target.value)}
                                                className={`border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%] ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}
                                            />
                                        </div>
                                    </div>
                                </div>
            
            
            
            
            
            
                                <div className="w-[90%] mx-auto mt-8 flex flex-col gap-4 pb-6">
                                    <h2 className="text-[18px] font-bold text-[#9277FF]">Bill To</h2>
            
                                    <label 
                                        htmlFor="" 
                                        className="mt-6 text-[15px] font-semibold text-[#888EB0]"
                                    >Client's Name</label>
                                    <input 
                                        type="text" 
                                        value={clientName}
                                        onChange={e => setClientName(e.target.value)}
                                        className={`w-[100%] focus:border-[#9277FF] h-[50px] border-2 mt-2 text-font-semibold outline-none rounded-lg pl-3  ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}
                                    />
            
                                    <label 
                                        htmlFor="" 
                                        className="mt-6 text-[15px] font-semibold text-[#888EB0]"
                                    >Clients's Email</label>
                                    <input 
                                        type="email"
                                        value={clientEmail}
                                        onChange={e => setClientEmail(e.target.value)}
                                        className={`w-[100%] focus:border-[#9277FF] h-[50px] border-2 mt-2 text-font-semibold outline-none rounded-lg pl-3  ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}
                                    />
            
                                    <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Street Address</label>
                                    <input 
                                        type="text"  
                                        value={clientAddress}
                                        onChange={e => setClientAddress(e.target.value)}
                                        className={`w-[100%] focus:border-[#9277FF] h-[50px] border-2 mt-2 text-font-semibold outline-none rounded-lg pl-3  ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}
                                    />
            
                                    <div className="w-[100%] gap-4 mt-4 flex justify-between items-center">
                                        <div>
                                            <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">City</label>
                                            <input 
                                                type="text" 
                                                value={clientCity}
                                                onChange={e => setClientCity(e.target.value)}
                                                className={`border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%] ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Post code</label>
                                            <input 
                                                type="text"  
                                                value={clientPostCode}
                                                onChange={e => setClientPostCode(e.target.value)}
                                                className={`border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%] ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Country</label>
                                            <input 
                                                type="text"  
                                                value={clientCountry}
                                                onChange={e => setClientCountry(e.target.value)}
                                                className={`border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%] ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}
                                            />
                                        </div>
                                    </div>
            
            
                                    <div className="w-[100%] gap-4 mt-8 flex justify-between items-center">
                                        <div>
                                            <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Invoice Date</label>
                                            <input 
                                                value={invoiceDate}
                                                onChange={e => setInvoiceDate(e.target.value)}
                                                type="date" 
                                                className={`border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%]  ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Payment Terms</label>
                                            <select  
                                                value={paymentTerms}
                                                onChange={e => setPaymentTerms(e.target.value)}
                                                className={`border-2 focus:border-[#9277FF] hover:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%] ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}>
                                                <option value="1">Net 1 Day</option>
                                                <option value="7">Net 7 Days</option>
                                                <option value="14">Net 14 Days</option>
                                                <option value="30">Net 30 Days</option>
                                            </select>
                                        </div>
                                        
                                    </div>
                                
                                    <label 
                                        htmlFor="" 
                                        className="mt-8 text-[15px] font-semibold text-[#888EB0]"
                                    >Product Description</label>
                                    <input 
                                        type="text"  
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        className={`w-[100%] h-[50px] focus:border-[#9277FF] border-2 mt-2 text-font-semibold outline-none rounded-lg pl-3 ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}
                                    />
                                </div>
            
                            {/* Item List */}
            
                                <div className="w-[90%] mx-auto mt-6 pb-8">
                                    <h2 className="text-[18px] font-bold text-[#888EB0]">Item List</h2>
                                    
                                    <div className="max-w-2xl mx-auto font-sans">
                  
            
                  <div className="flex font-semibold text-sm text-gray-500 mb-2 mt-4">
                    <div className="flex-2 w-2/5">Item Name</div>
                    <div className="flex-1 w-1/5">Qty.</div>
                    <div className="flex-1 w-1/5">Price</div>
                    <div className="flex-1 w-1/5">Total</div>
                    <div className="w-6"></div>
                  </div>
            
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center mb-2 mt-4">
                      <input
                        className={`flex-2 w-2/5 p-2 rounded-lg border  ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white border-gray-300"} `}
                        type="text"
                        placeholder="Item name"
                        value={item.name}
                        onChange={(e) => updateItem(index, "name", e.target.value)}
                      />
                      <input
                        className={`flex-1 w-1/5 p-2 rounded-lg border  ml-2 ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white border-gray-300"} `}
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateItem(index, "qty", parseInt(e.target.value))}
                      />
                      <input
                        className={`flex-1 w-1/5 p-2 rounded-lg border  ml-2 ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white border-gray-300"} `}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(index, "price", parseFloat(e.target.value))
                        }
                      />
                      <div className="flex-1 w-1/5 ml-2 font-semibold text-gray-700">
                        {(item.qty * item.price).toFixed(2)}
                      </div>
                      <button
                        onClick={() => deleteItem(index)}
                        className="ml-2 text-gray-400 hover:text-red-500"
                        title="Delete item"
                      >
                        <span>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </button>
                    </div>
                    ))} 
            
                  
                </div>
            
                                    <button type="button"  onClick={addItem} className="w-[100%] bg-[#F8F8FB] text-[#888EB0] hover:bg-[#DFE3FA] rounded-[50px] mt-6 h-[50px] text-[17px] font-bold">+ Add New Item</button>
                                </div>
            
                               <div className="flex justify-between items-center w-[90%] mx-auto gap-4 mt-8 pb-12">
                                    <div>
                            <button 
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="hidden md:block w-[120px] h-[50px] bg-[#F8F8FB] text-[#7E88C3] rounded-[50px] text-[15px] font-bold ">Discard</button>
                        </div>
                        <div className="flex gap-4">
                            <button className="hidden md:block w-[150px] h-[50px] bg-[#252945] text-[#7E88C3] rounded-[50px] text-[15px] font-bold ">Save as Draft</button>
                            
                            {/* Cancel button for mobile screen */}
                            <button 
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="md:hidden w-[120px] h-[50px] bg-[#F8F8FB] text-[#7E88C3] rounded-[50px] text-[15px] font-bold ">Cancel</button>
                            
                            {/* Save button for mobile screen */}
                            <button
                                onClick={() => setShowModal(false)}
                                type="submit"
                                className="md:hidden w-[150px] h-[50px] bg-[#7C5DFA] hover:bg-[#9277FF] text-white rounded-[50px] text-[15px] font-bold ">Save</button>

                            <button
                                onClick={() => setShowModal(false)}
                                type="submit"
                                className="hidden md:block w-[150px] h-[50px] bg-[#7C5DFA] hover:bg-[#9277FF] text-white rounded-[50px] text-[15px] font-bold ">Save & Send</button>
                        </div>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default InvoiceContent;