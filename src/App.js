import { useState, useEffect, useRef} from 'react';
import './App.css';
import PaginationInfo from './PaginationInfo'
import DataTable from './DataTable';
import Pagination from './Pagination';

function App() {
  const [data, setData] = useState([]);

  const [userInput, setUserInput] = useState('')

  const userInputRef = useRef(null);

  const [searchColumns, setSearchColumns] = useState(['firstname','lastname']);

  //Pagination
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);//data

const fetchData = () => {
  fetch('https://fakerapi.it/api/v1/users?_quantity=100&_gender=male')
  .then( res => res.json() )
  .then( data => {
    setData(data.data)
  })
  .catch(e => console.log(e))
}

  useEffect(() => {
    fetchData();
    setPageBoundaries();
    userInputRef.current.focus();
  }, [])

  useEffect(() => {
    setPageBoundaries();
  }, [recordsPerPage, currentPage])
  const totalRecords = search(data);

  function search(data){
    //const columns = data[0] && Object.keys(data[0]);
    return (data || []).filter( row => 
      searchColumns.some( column => row[column].toString().toLowerCase().indexOf(userInput.toLowerCase()) > -1)
    )
  }

  const setPageBoundaries = () => {
    console.log('inside setPageBoundaries')
    const indexOfLastRecord = currentPage * recordsPerPage ;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const records = data.slice(indexOfFirstRecord, indexOfLastRecord);
    console.log(records.length,'records length')
    setTotalPages(records);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setPageBoundaries();
  }

  const columns = data[0] && Object.keys(data[0]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  return (
    <div className="App">
      <h1>Table</h1>
      <input type="text" 
        value={userInput} 
        onChange={ e => setUserInput(e.target.value)}
        ref={userInputRef}
        />
        {
          (columns || []).map( column => <label key={column}>
            <input 
              type="checkbox"
              checked={searchColumns.includes(column)}
              onChange={ e => {
                const checked = searchColumns.includes(column);
                setSearchColumns( prev => {
                  return checked ? prev.filter(sc => sc !== column) : [...prev, column]
                })
              }}
            />
            {column}
          </label>
          )
        }
        <PaginationInfo from={indexOfFirstRecord + 1} to={indexOfLastRecord} totalCount={totalRecords.length}/>
        <label> select :</label>
        <select value={recordsPerPage} onChange={(e) => {
          setRecordsPerPage(e.target.value);
          setCurrentPage(1);
          setPageBoundaries();
        }}>
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <Pagination 
          totalCount={data.length}
          currentPage={currentPage}
          recordsPerPage={recordsPerPage}
          paginate={paginate}
        />
      <DataTable data={search(data || totalPages)}/>
    </div>
  );
}

export default App;
