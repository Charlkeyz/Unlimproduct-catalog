/* eslint-disable react-hooks/exhaustive-deps */
import  { useContext } from 'react'
import { ContextApi } from '../ContextAPI/ContextApi'
import { Headers } from '../ContextAPI/Headers'

const TableData = () => {

    const { handleCheckBox, handleSelectAll, selectedItem, isLoading, selectAll, filteredItem} = useContext(ContextApi)

    
    if(isLoading){
      return <div className='flex justify-center items-center w-screen h-screen'>...Loading</div>
    }
  return (
    <div className=''>
        <section className='bg-[#F6F6F6] px-10 w-screen h-screen flex flex-col items-start overflow-x-auto'>
            <h1 className='py-10 text-[18px] font-medium'>Department List</h1>
           <table className="min-w-full overflow-x-auto font-Table_font text-xs font-medium">
              <thead>
                <tr className='bg-[#F0F4FE]'>
                  <th>
                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className='accent-blue-600'/>
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
                  filteredItem.slice(0, 10).map((item, index, arr)=> {
                    const {SKU, Image_1, Description, Title, Name, Brand, Quantity, size, ['Cost Price']: costPrice } = item
                    return(
                      <tr key={index} className={`w-full leading-4 border-b-2 sm:text-xs text-[10px] ${index === arr.length - 1 ? 'border-b-0' : ''}`}>
                        <td className={`py-3 px-5 ${index === 0 ? 'rounded-tl-xl' : ''} ${index === arr.length - 1 ? 'rounded-bl-xl' : ''}`}><input type="checkbox" checked={selectedItem.includes(SKU)} onChange={() => handleCheckBox(SKU)} className='accent-blue-600'/></td>
                        <td className={`py-3 px-5`}>{index + 1}.</td>
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
        </section>
    </div>

  )
}

export default TableData