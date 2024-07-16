/* eslint-disable react-hooks/exhaustive-deps */
import  { useContext } from 'react'
import { ContextApi } from '../ContextAPI/ContextApi'
import { Headers } from '../ContextAPI/Headers'
import ReactPaginate from 'react-paginate'

const TableData = () => {

    const { handleCheckBox, itemsPerPage, indexOfFirstItem, totalItems, currentPage, handleSelectAll, selectedItem, isLoading, selectAll, filteredItem, handlePageClick, pageCount, currentItems} = useContext(ContextApi)

  
    if(isLoading){
      return <div className='flex justify-center items-center w-screen h-screen'>Loading...</div>
    }

    // const startinIndex = currentPage * itemsPerPage
    
     

    // const pageCount = Math.ceil(filteredItem.length / itemsPerPage)

    

  return (
    <div className=''>
        <section className='bg-[#F6F6F6] px-10 w-screen h-screen flex flex-col items-start overflow-x-auto'>
            <h1 className='py-10 text-[18px] font-medium'>Department List</h1>
            <div>
              <h1>current page {currentPage + 1}</h1>
              Showing {indexOfFirstItem + 1} - {Math.min(indexOfFirstItem + itemsPerPage, totalItems)} of {totalItems} items

            </div>
           <table className="min-w-full overflow-x-auto font-Table_font text-xs font-medium">
              <thead>
                <tr className='bg-[#F0F4FE]'>
                  <th>
                    <input type="checkbox" checked={selectAll || (selectedItem.length === filteredItem.length && selectedItem.length > 0)} onChange={handleSelectAll} className='accent-blue-600 cursor-pointer'/>
                  </th>
                  {
                    Headers.map((title, index)=>(
                      <th key={index} className='py-3 px-5 text-xs font-semibold'>{title.label}</th>
                    ))
                  }
                </tr>
              </thead>
              <tr className='h-5'></tr>
              <tbody className="bg-white overflow-x-auto" > 
                {
                  currentItems.map((item, index, arr)=> {
                    const {SKU, Image_1, Description, Title, Name, Brand, Quantity, size, ['Cost Price']: costPrice } = item
                    
                    const serialNo = filteredItem.indexOf(item) + 1
                    return(
                      <tr key={index} className={`w-full leading-4 border-b-2 sm:text-xs text-[10px] ${index === arr.length - 1 ? 'border-none' : ''}`}>
                        <td className={`py-3 px-5 ${index === 0 ? 'rounded-tl-xl' : ''} ${index === arr.length - 1 ? 'rounded-bl-xl' : ''}`}><input type="checkbox" checked={selectedItem.includes(SKU)} onChange={() => handleCheckBox(SKU)} className='accent-blue-600 cursor-pointer'/></td>
                        <td className={`py-3 px-5`}>{serialNo}.</td>
                        <td className=' sm:w-[40px] sm:h-[40px] py-3 px-5'><img src={Image_1} alt="" /></td>
                        <td className='py-3 px-5'>{SKU}</td>
                        <td className='py-3 px-5'>{Name}</td>
                        <td className='py-3 px-5'>{Title}</td>
                        <td className='py-3 px-5'>{Description}</td>
                        <td className='py-3 px-5'>{Brand}</td>
                        <td className='py-3 px-5'>{costPrice}</td>
                        <td className='py-3 px-5'>{Quantity}</td>
                        <td className={`py-3 px-5 ${index === 0 ? 'rounded-tr-xl' : ''} ${index === arr.length - 1 ? 'rounded-br-xl' : ''}`}>{size}</td>
                        
                      </tr>
                    )
                  })
                }
              </tbody>
           </table>
           <div className='flex justify-center items-center w-full overflow-hidden'>
           <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            onPageChange={handlePageClick}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            containerClassName={'flex justify-center mt-4'}
            pageClassName={'mx-1'}
            pageLinkClassName={'block py-2 px-4 border border-gray-300 rounded hover:bg-blue-500 hover:text-white transition-colors duration-200'}
            previousClassName={'mx-1'}
            previousLinkClassName={'block py-2 px-4 border border-gray-300 rounded hover:bg-blue-500 hover:text-white transition-colors duration-200'}
            nextClassName={'mx-1'}
            nextLinkClassName={'block py-2 px-4 border border-gray-300 rounded hover:bg-blue-500 hover:text-white transition-colors duration-200'}
            breakClassName={'mx-1'}
            breakLinkClassName={'block py-2 px-4 border border-gray-300 rounded'}
            activeClassName={'bg-blue-500 text-white'}
          />
           </div>
        </section>
    </div>

  )
}

export default TableData