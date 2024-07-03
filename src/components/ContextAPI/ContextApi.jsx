/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, createContext, useEffect} from "react";

export const ContextApi = createContext()

export const ContextApiProvider = ({children}) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedItem, setSelectedItem] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [selectAll, setSelectAll] = useState(false)
    const [filteredItem, setFilteredItem] = useState([])



    const fetchApiData = async () => {
        try {
            const response = await axios.get('http://3.88.1.181:8000/products/public/catalog?supplier=FragranceX&first=0&last=50');
            setData(response.data)
            setFilteredItem(response.data)
            
        } catch (error) {
            console.log("error while fetching data", error)
            
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(()=> {
        fetchApiData();
        
    },[])

    // for the searchInput fields 
    useEffect(()=> {
        if(data){
        setFilteredItem(
            data.filter((item)=> 
                item.Name.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.SKU.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
                item.Title.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.Description.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.Brand.toLowerCase().includes(searchInput.toLowerCase())
            )
        )
    }
    },[searchInput, data])
    // Table body ckeckbox
    const handleCheckBox = (id) => {
        setSelectedItem((prevSelectedItem) => {
            if(prevSelectedItem.includes(id)) {
                return prevSelectedItem.filter((item)=> item !== id)
            }else {
                return [...prevSelectedItem, id]
            }
        })
    }
    // Table header checkbox
    const handleSelectAll = () => {
        if(selectAll){
            setSelectedItem([])
        }else{
            setSelectedItem(filteredItem.slice(0, 10).map((item) => item.SKU))
        }
        setSelectAll(!selectAll)
    }
    // search input navbar
    const handleSearchInput = (e) => {
        setSearchInput(e.target.value)
    }

    const value = {data, fetchApiData, handleCheckBox, handleSelectAll, handleSearchInput, selectedItem, isLoading, searchInput, filteredItem, setSearchInput, setFilteredItem, selectAll}

    return (
        <ContextApi.Provider value={value}>{children}</ContextApi.Provider>
    )
}
export default ContextApiProvider;