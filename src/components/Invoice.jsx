import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import  "./Home";
// import InvoiceItemList from "./ItemList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// Default invoices (used if localStorage is empty)
const defaultInvoices = [
    {
        id: "RT308",
        duedate: "19 Aug 2021",
        name: "Kelechi Kingsley",
        amount: 500,
        curency: "$",
        status: "paid",
    },
    {
        id: "RT309",
        duedate: "20 Aug 2021",
        name: "Jane Doe",
        amount: 750,
        curency: "$",
        status: "pending",
    },
];


// Generate a unique id in the format RTXXX
const generateInvoiceId = () => {
    const stored = localStorage.getItem("invoices");
    const invoicesArr = stored ? JSON.parse(stored) : [];
    // Find the highest number used so far
    const maxId = invoicesArr.reduce((max, inv) => {
        const match = inv.id && inv.id.match(/^RT(\d+)$/);
        return match ? Math.max(max, parseInt(match[1], 10)) : max;
    }, 308); // Start from 308 if no invoices
    return `RT${maxId + 1}`;
};



const Invoice = ({theme}) => {
    const [invoices, setInvoices] = useState([]);
    const [filter, setFilter] = useState("all");

      // Bill from
    const [billerAddress, setBillerAddress] = useState("");
    const [billerCity, setBillerCity] = useState("");
    const [billerPostCode, setBillerPostCode] = useState("");
    const [billerCountry, setBillerCountry] = useState("");


    // Bill to
    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientAddress, setClientAddress] = useState("");
    const [clientCity, setClientCity] = useState("");
    const [clientPostCode, setClientPostCode] = useState("");
    const [clientCountry, setClientCountry] = useState("");


   // Other fields
    const [description, setDescription] = useState("");
    const [invoiceDate, setInvoiceDate] = useState("");
    const [paymentTerms, setPaymentTerms] = useState("1");
    const [items, setItems] = useState([]);
   

    // Load invoices from localStorage or use default
    useEffect(() => {
        const stored = localStorage.getItem("invoices");
        if (stored) {
            setInvoices(JSON.parse(stored));
        } else {
            setInvoices(defaultInvoices);
            localStorage.setItem("invoices", JSON.stringify(defaultInvoices));
        }
    }, []);

    const filteredInvoices = filter === "all"
    ? invoices
    : invoices.filter(inv => inv.status === filter);

    const invoicesection = filteredInvoices.map((invoice, idx) =>
        <Link to={`/invoice/${invoice.id}`} key={invoice.id} className="w-[100%]">
        <div key={idx} className={`w-[100%] ${theme === "dark" ? "bg-[#252945]" : "bg-white"}  h-[140px] md:h-[100px] xl:h-[80px]  rounded-xl flex justify-between items-center`}>
            
            {/* Left Section */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 pl-6 font-semibold text-[#888EB0]">
                <div>
                    <h2 className="font-bold">#<span className={`text-black ${theme === "dark" ? "text-white" : "text-black"}`}>{invoice.id}</span></h2>
                </div>
                <div>
                    <h2>Due {invoice.duedate}</h2>
                </div>
                <div>
                    <h2 className="hidden md:block">{invoice.name}</h2>
                    <h2 className={`text-[20px] md:hidden font-bold text-white ${theme === "dark" ? "text-white" : "text-black"}`}>{invoice.curency}{invoice.amount}</h2>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col md:flex-row gap-4 items-center md:gap-8 pr-6">
                <div>
                    <h2 className={`text-[19px] font-bold hidden md:block ${theme === "dark" ? "text-white" : "text-black"}`}>{invoice.curency}{invoice.amount}</h2>
                    <h2 className="text-[#888EB0] md:hidden font-semibold">{invoice.name}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`w-[120px] rounded-xl h-[45px] flex justify-center items-center gap-2
                        ${invoice.status === "paid"
                            ? "bg-[#33d69f1a]"
                            : invoice.status === "draft"
                                ? "bg-[#DFE3FA]"
                                :  "bg-red-200 w-[150px]"}`}>
                        <div className={`w-[8px] h-[8px] rounded-full 
                            ${invoice.status === "paid"
                                ? "bg-[#33D69F]"
                                : invoice.status === "draft"
                                    ? "bg-[#888EB0]"
                                    : "bg-[#EC5757]"}`}></div>
                        <h2 className={`font-bold 
                            ${invoice.status === "paid"
                                ? "text-[#33D69F]"
                                : invoice.status === "draft"
                                    ? "text-gray-500"
                                    : "text-[#EC5757]"}`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </h2>
                    </div>
                    <div className="text-[20px] font-bold text-[#9277FF]">&#10095;</div>
                </div>
            </div>
        </div>
        </Link>
    );


    // Add items

    //  const [items, setItems] = useState([]);
    
    const addItem = () => {
        setItems([...items, { name: "", qty: 1, price: 0 }]);
      };
    
      const deleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
      };
    
      const updateItem = (index, key, value) => {
        const newItems = [...items];
        newItems[index][key] = value;
        setItems(newItems);
      };


      // handler for saving the invoice
     const handleSaveInvoice = (e) => {
    e.preventDefault();

    const newInvoice = {
        id: generateInvoiceId(),
        name: clientName,
        email: clientEmail,
        description: description,
        billerAddress,
        billerCity,
        billerPostCode,
        billerCountry,
        clientAddress,
        clientCity,
        clientEmail,
        clientPostCode,
        clientCountry,
        items,
        amount: items.reduce((sum, item) => sum + item.qty * item.price, 0),
        curency: "$",
        status: "pending",
        duedate: invoiceDate || new Date().toLocaleDateString(),
    };


    

    // Get existing invoices
    const stored = localStorage.getItem("invoices");
    const invoicesArr = stored ? JSON.parse(stored) : [];

    // Add new invoice and save
    const updatedInvoices = [...invoicesArr, newInvoice];
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    setInvoices(updatedInvoices); // <-- This updates the UI immediately

    // Reset form and close modal
    setClientName("");
    setClientEmail("");
    setDescription("");
    setBillerAddress("");
    setBillerCity("");
    setBillerPostCode("");
    setBillerCountry("");
    setClientAddress("");
    setClientCity("");
    setClientPostCode("");
    setClientCountry("");
    setItems([]);
    setShowModal(false); // Optionally close the modal
};


const handleSaveDraft = (e) => {
    e.preventDefault();

    const newInvoice = {
        id: generateInvoiceId(),
        name: clientName,
        email: clientEmail,
        description: description,
        billerAddress,
        billerCity,
        billerPostCode,
        billerCountry,
        clientAddress,
        clientCity,
        clientEmail,
        clientPostCode,
        clientCountry,
        items,
        amount: items.reduce((sum, item) => sum + item.qty * item.price, 0),
        curency: "$",
        status: "draft", // <-- Draft status
        duedate: invoiceDate || new Date().toLocaleDateString(),
    };

    const stored = localStorage.getItem("invoices");
    const invoicesArr = stored ? JSON.parse(stored) : [];
    const updatedInvoices = [...invoicesArr, newInvoice];
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    setInvoices(updatedInvoices);

    // Reset form and close modal
    setClientName("");
    setClientEmail("");
    setDescription("");
    setBillerAddress("");
    setBillerCity("");
    setBillerPostCode("");
    setBillerCountry("");
    setClientAddress("");
    setClientCity("");
    setClientPostCode("");
    setClientCountry("");
    setItems([]);
    setShowModal(false);
};

const [showModal, setShowModal] = useState(false);
  return (
    <main className="w-full flex flex-col">

    {/* Invoice Header */}
        <div className="w-full flex justify-between items-center">
            <div className={`flex flex-col ${theme === "dark" ? "text-white" : "text-black"}`}>
                <h2 className="text-[30px] font-bold">Invoices</h2>
                <h5 className={`text-[16px] font-bold ${theme === "dark" ? "text-[#888EB0]" : "text-black"}`}>
                   {invoices.length === 0
                    ? "No invoice"
                    : `There ${invoices.length === 1 ? "is" : "are"} ${invoices.length} invoice${invoices.length === 1 ? "" : "s"}`}
                </h5>
            </div>

            {/* Header Right */}
            <div className="flex items-center gap-2">

            {/* Filter */}
                <div className="flex items-center text-[20px] font-semibold">
                    
                    <select
                        className={`${theme === "dark" ? "text-[#7C5DFA] bg-[#252945]" : "text-black"} bg-transparent border-none  outline-none  text-[17px] font-semibold`}
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    >   <option value="all">Filter</option>
                        <option value="all">All</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

            {/* New invoice */}
                <div 
                    onClick={() => setShowModal(true)}
                    className="xl:w-[190px] w-[150px] h-[55px] bg-[#7C5DFA] hover:bg-[#9277FF] rounded-[50px] gap-[2px] flex justify-between items-center p-2">
                    <div className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] bg-white rounded-full flex justify-center items-center ">
                        <span className="text-[30px] font-bold text-[#9277FF]">+</span>
                    </div>
                    <div className="pr-2">
                        <h2 className="text-[13px] xl:text-[16px] font-bold text-white">New Invoice</h2>
                    </div>
                </div>
            </div>

        </div>

    <div className="w-full xl:w-auto mt-16 flex flex-col gap-6">
        {invoicesection}
    </div>

    <div className={`${invoices.length === 0 ? "" : "hidden"} w-[100%] h-auto flex justify-center items-center mt-8 `}>
        <img src="/assets/noinvoice.png" className="w-auto h-auto" alt="" />
    </div>


    <div className={`${showModal ? "" : "hidden"} w-[100%] h-[100vh] bg-black absolute pt-4 md:pt-0 z-10 xl:top-0 top-[10%] md:top-[8%] left-0 bg-opacity-55 `}>
        <div className={`w-[100%] md:w-[90%] xl:w-[45%] rounded-tr-xl rounded-br-xl h-[100%] overflow-auto  md:pl-[5%] ${theme === "dark" ? "bg-[#141625]" : "bg-white"}`}>
            <button  
                onClick={() => setShowModal(false)}
                className="md:hidden p-4">
                <div className="flex items-center gap-4 text-[20px] font-bold">
                    <span className={`${theme === "dark" ? "text-[#9277FF]" : "text-black"}`}>&#10094;</span>
                    <h2 className={`${theme === "dark" ? "text-white" : "text-black"}`}>Go Back</h2>
                </div>
            </button>
            
            <div className={`${theme === "dark" ? "text-white" : "text-black"} p-2 md:p-4 text-[25px] font-bold`}>
                <h2>New Invoice</h2>
            </div>
            <div>
                
                <form onSubmit={handleSaveInvoice}>
                    <div className="w-[90%] mx-auto flex flex-col gap-4">
                        <h2 className="text-[18px] font-bold text-[#9277FF]">Bill from</h2>

                        <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Street Address</label>
                        <input 
                            type="text"  
                            value={billerAddress}
                            onChange={e => setBillerAddress(e.target.value)}
                            className={`w-[100%] focus:border-[#9277FF] h-[50px] border-2 mt-2 text-font-semibold outline-none rounded-lg pl-3 ${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} `}
                        />

                        <div className="w-[100%] gap-4 mt-4 flex justify-between items-center">
                            <div>
                                <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">City</label>
                                <input 
                                    type="text"  
                                    value={billerCity}
                                    onChange={e => setBillerCity(e.target.value)}
                                    className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%]`}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Post code</label>
                                <input 
                                    type="text" 
                                     value={billerPostCode}
                                    onChange={e => setBillerPostCode(e.target.value)}
                                    className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%]`}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Country</label>
                                <input 
                                    type="text"  
                                    value={billerCountry}
                                    onChange={e => setBillerCountry(e.target.value)}
                                    className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%]`}
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
                            className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} w-[100%] focus:border-[#9277FF] h-[50px] border-2 mt-2 text-font-semibold outline-none rounded-lg pl-3 `}
                        />

                        <label 
                            htmlFor="" 
                            className="mt-6 text-[15px] font-semibold text-[#888EB0]"
                        >Clients's Email</label>
                        <input 
                            type="email"
                            value={clientEmail}
                            onChange={e => setClientEmail(e.target.value)}
                            className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} w-[100%] focus:border-[#9277FF] h-[50px] border-2 mt-2 text-font-semibold outline-none rounded-lg pl-3 `}
                        />

                        <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Street Address</label>
                        <input 
                            type="text"  
                            value={clientAddress}
                            onChange={e => setClientAddress(e.target.value)}
                            className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} w-[100%] focus:border-[#9277FF] h-[50px] border-2 mt-2 text-font-semibold outline-none rounded-lg pl-3 `}
                        />

                        <div className="w-[100%] gap-4 mt-4 flex justify-between items-center">
                            <div>
                                <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">City</label>
                                <input 
                                    type="text" 
                                    value={clientCity}
                                    onChange={e => setClientCity(e.target.value)}
                                    className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%]`}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Post code</label>
                                <input 
                                    type="text"  
                                    value={clientPostCode}
                                    onChange={e => setClientPostCode(e.target.value)}
                                    className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%]`}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Country</label>
                                <input 
                                    type="text"  
                                    value={clientCountry}
                                    onChange={e => setClientCountry(e.target.value)}
                                    className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%]`}
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
                                    className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} border-2 focus:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%] `}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="mt-6 text-[15px] font-semibold text-[#888EB0]">Payment Terms</label>
                                <select  
                                    value={paymentTerms}
                                    onChange={e => setPaymentTerms(e.target.value)}
                                    className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} border-2 focus:border-[#9277FF] hover:border-[#9277FF] pl-2 text-[15px] h-[50px] rounded-lg font-semibold outline-none w-[100%]`}>
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
                            className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} w-[100%] h-[50px] focus:border-[#9277FF] border-2 mt-2 text-font-semibold outline-none rounded-lg pl-3 `}
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
            className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} outline-none focus:border-[#9277FF] flex-2 w-2/5 p-2 rounded-lg border border-gray-300`}
            type="text"
            placeholder="Item name"
            value={item.name}
            onChange={(e) => updateItem(index, "name", e.target.value)}
          />
          <input
            className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} outline-none focus:border-[#9277FF] flex-1 w-1/5 p-2 rounded-lg border border-gray-300 ml-2`}
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) => updateItem(index, "qty", parseInt(e.target.value))}
          />
          <input
            className={`${theme === "dark" ? "bg-[#1E2139] border-[#252945] text-white" : "bg-white"} outline-none focus:border-[#9277FF] flex-1 w-1/5 p-2 rounded-lg border border-gray-300 ml-2`}
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

                        <button type="button"  onClick={addItem} className="mb-40 w-[100%] bg-[#F8F8FB] text-[#888EB0] hover:bg-[#DFE3FA] rounded-[50px] mt-6 h-[50px] text-[17px] font-bold">+ Add New Item</button>
                    </div>

                   <div className={`flex justify-between items-center w-[100%] md:w-[45%] left-0 mx-auto gap-4 mt-8 pb-8 p-4 pt-8 fixed z-20 bottom-0 ${theme === "dark" ? "bg-[#1E2139] rounded-tr-xl " : "bg-white"} `}>
                        <div className="pl-16">
                            <button 
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="hidden md:block w-[120px] h-[50px] bg-[#F8F8FB] text-[#7E88C3] rounded-[50px] text-[15px] font-bold ">Discard</button>
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={handleSaveDraft}
                                className="hidden md:block w-[150px] h-[50px] bg-[#252945] text-[#7E88C3] rounded-[50px] text-[15px] font-bold ">Save as Draft</button>
                            
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
</main>
  )
}

export default Invoice;