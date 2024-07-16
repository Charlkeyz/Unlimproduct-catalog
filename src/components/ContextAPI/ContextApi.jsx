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
    const [currentPage, setCurrentPage] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const itemsPerPage = 10



    const fetchApiData = async () => {
        try {
            const response = await axios.get('http://3.88.1.181:8000/products/public/catalog?supplier=FragranceX&first=0&last=100');
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
            const filtered = data.filter((item, index) => {
                const sn = index + 1
                return (
                    sn.toString().includes(searchInput.toLowerCase()) ||
                    item.Name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.SKU.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.Title.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.Description.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.Brand.toLowerCase().includes(searchInput.toLowerCase())
                )
            } 
            
        )
        setFilteredItem(filtered)
        setTotalItems(filtered.length)
        setCurrentPage(0)
        
            
        }
        
       
    
    },[searchInput, data])

    // useEffect(()=> {
    //     setCurrentPage(0)
    // },[searchInput])

    
    
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

        if (selectAll) {
            setSelectedItem([])
          } else {
            setSelectedItem(
              filteredItem
                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                .map((item) => item.SKU)
            
            );
        }
          
          setSelectAll(!selectAll);
    }
    // search input navbar
    const handleSearchInput = (e) => {
        setSearchInput(e.target.value)
        
        // const newFilteredItems = data.filter((item) => 
        //     item.Name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        //     item.SKU.toString().toLowerCase().includes(e.target.value.toLowerCase()) ||
        //     item.Title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        //     item.Description.toLowerCase().includes(e.target.value.toLowerCase()) ||
        //     item.Brand.toLowerCase().includes(e.target.value.toLowerCase())
        //   )
        //   setFilteredItem(newFilteredItems)
          
        //   // Adjust current page if necessary
        //   const maxPage = Math.max(0, Math.ceil(newFilteredItems.length / itemsPerPage) - 1)
        //   if (currentPage > maxPage) {
        //     setCurrentPage(maxPage)
        //   }
    }
    const indexOfLastItem = (currentPage + 1) * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    const currentItems = filteredItem.slice(indexOfFirstItem, indexOfLastItem);
    const pageCount = Math.ceil(filteredItem.length / itemsPerPage);

    const handlePageClick = ({selected}) => {
        setCurrentPage(selected)
        
    }


    const value = {data, setSelectAll, fetchApiData, handleCheckBox, handleSelectAll, handleSearchInput, selectedItem, isLoading, searchInput, filteredItem, setSearchInput, setFilteredItem, selectAll, itemsPerPage, indexOfFirstItem, setCurrentPage, totalItems, currentPage, currentItems, handlePageClick, pageCount}

    return (
        <ContextApi.Provider value={value}>{children}</ContextApi.Provider>
    )
}
export default ContextApiProvider;