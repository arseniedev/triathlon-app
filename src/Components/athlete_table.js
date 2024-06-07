export default function AthleteTable({onSearch, onDelete, onGet}) {
  // let allMyAthletes = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)))
  
  // console.log(onGet)

  const [query, setQuery] = React.useState("-")
  const [sort, setSort] = React.useState({ keyToSort: "id", direction: "asc" })
  // const [entry, setEntry] = React.useState([])



  const headers = [
    {id: 1,key: "id", label: "Athlete ID"},
    {id: 2,key: "firstname", label: "First Name"},
    {id: 3,key: "lastname", label: "Last Name"},
    {id: 5,key: "Swim", label: "Swim Duration"},
    {id: 6,key: "Run", label: "Run Duration"},
    {id: 7,key: "Bike", label: "Bike Duration"},
    // {id: 8,key: "Delete", label: "Delete"},
  ]

  const handleSearch = (event) => {
    const value = event.target.value
    setQuery(onSearch(value))
}

// const handleLoad = () => {
//   setEntry(onGet())
// }

const handleDelete = (index) => {
  onDelete(index)
}

  const handleHeaderClick = (column) => {
    setSort(
      {
        keyToSort: column.key,
        direction:
        column.key === sort.keyToSort ? sort.direction === "asc" ? "desc" : "asc" : "desc"
      }
    )
  }

  const sortAllAthletes = (arrayToSort) => {
    return arrayToSort.sort((a, b) => {
        if (sort.direction === 'asc') {
            return a[sort.keyToSort] >  b[sort.keyToSort] ? 1 : -1
        } else{
            return a[sort.keyToSort] >  b[sort.keyToSort] ? -1 : 1
        }
    })
  }

    return (
        <div className="mt-4">
        <h1>Triathlon Athletes</h1>
        <input id="search-input" onChange={handleSearch} placeholder="Search Athlete by ID"/>
        {/* <input type="button" onClick={() => { handleClick('clear');}}value="Clear"></input> */}
        <div>{query}</div>
        <table className="table mt-3">
          <thead>
            <tr>
              {headers.map((header,index) => (
                <th scope="col" key={index} onClick={() => handleHeaderClick(header)}>
                    <span>{header.label}</span>
                </th>
              ))} 
            </tr>
          </thead>
          <tbody id="athlete-entry">
            {/* {initEntry} */}
            {sortAllAthletes(onGet).map((row, index) => (
              <tr key={index}>
                  {headers.map((header, index) => (
                      <td key={index}>
                          <span>{row[header.key]}</span>
                      </td>
                  ))}
                  <button type="button" className="delete" onClick={() => handleDelete(row.id)}>Delete</button>
                  <button type="button" className="edit">Edit</button>
                  {/* <button type="button" className="calc">Calculate</button> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }