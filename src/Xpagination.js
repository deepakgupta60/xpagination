import axios from "axios";
import React, { useEffect, useState } from "react";

import "./Xpagination.css";

const Xpagination = () => {

  const [empData, setEmpData] = useState([])


  const [currentPage, setCurrentPage]=useState(1)
  const recordsPerPage = 10;



  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').then((response) => setEmpData(response.data)).catch((err) => alert('failed to fetch data'))
  }, [])



  // for logic how to calculate first and last index

  const lastIndex = currentPage*recordsPerPage; // 1*10 = 10
  const firstIndex = lastIndex-recordsPerPage // 10 - 10 = 0
  const currentRecords = empData.slice(firstIndex, lastIndex) //  store in according to pages,

  console.log(currentRecords,"Testing Records"); // this is for fist page only.. only have a current or for first page content ... slice means cutting, so from 0 to 10 --> okay. when have 90 then 10 cut, rest will be 80..
  
  
  const totalPages = Math.ceil(empData.length/recordsPerPage) // 90/10 == 9

  const handleNextPage = () => {
    if(currentPage<totalPages) // 1<10 // 
    {
      setCurrentPage(currentPage+1)
    }
  }
  const handlePrevPage = () => {
    
    if(currentPage>1)
    {
      setCurrentPage(currentPage-1)
    }

  }

  return (
    <div className="paginationData">
      <h1>Employee Data Table</h1>
      <div className="tableData">


        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((data) => (
              <tr key={data.id}>
                  <td>
                  {
                    data.id
                  }
                </td>
                <td>
                  {
                    data.name
                  }
                </td>
                <td>
                  {
                    data.email
                  }
                </td>
                <td>
                  {
                    data.role
                  }
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handlePrevPage}>Previous</button>
      <button>{currentPage}</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  )
}

export default Xpagination;