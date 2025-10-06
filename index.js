let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById('tab-btn')

// 1.Check if leadsFromLocalStorage is truthy
// 2.If so,set myLeads to its value and call renderLeads()
if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", ()=> {
    // Grab the URL of the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    });
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

// when clicked, clear localStorage, myLeads and the DOM
deleteBtn.addEventListener("dblclick", ()=>{
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", ()=> {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    // save the myLeads array to localStorage
    // remember JSON.stringify()
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    // To verify 
    // console.log(localStorage.getItem("myLeads"))
})




// document.createElement() creates a new HTML element(node) in JavaScript-but it dosen't appear on the page until we add it to the DOM
// or the following method
    // const li = document.createElement("li")
    // li.textContent = myLeads[i]
    // ulEl.append(li)


// json means javascript object notation it is used tp send a piece of data from a server to a client(that is to a browser)
// To save anything in the localStorage it should be in the form of strings not arrays and objects
// We will use JSON.stringify to save it in the string
// localStorage.setItem("<key_name>", JSON.stringify(<data>))
// localStorage.setItem("myLeads", JSON.stringify(myLeads))  it saves in myLeads from myLeads in the form of string
// JSON.parse() converts a JSON string (text) back into its original JavaScript data type — like an array, object, number, or boolean.
// Exactly! You use localStorage.getItem() to retrieve (get) data that you previously saved.