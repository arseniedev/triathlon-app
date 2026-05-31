export default function AthleteTable({onSearch, onDelete, onGet}) {

  const [query, setQuery] = React.useState("-")
  const [order, setOrder] = React.useState({ keyToSort: "id", direction: "asc" })

  const headers = [
    {id: 1,key: "id", label: "Athlete ID"},
    {id: 2,key: "firstname", label: "First Name"},
    {id: 3,key: "lastname", label: "Last Name"},
    {id: 5,key: "Swim", label: "Swim Duration"},
    {id: 6,key: "Run", label: "Run Duration"},
    {id: 7,key: "Bike", label: "Bike Duration"},
  ]

  const handleSearch = (event) => {
    const value = event.target.value
    setQuery(value)
  }

  const handleDelete = (index) => {
    onDelete(index)
  }

  const handleHeaderClick = (column) => {
    setOrder(
      {
        keyToSort: column.key,
        direction:
        column.key === order.keyToSort ? order.direction === "asc" ? "desc" : "asc" : "desc"
      }
    )
  }

  const sortAllAthletes = (arrayToSort) => {
    return arrayToSort.sort((a, b) => {
        if (order.direction === 'asc') {
            return a[order.keyToSort] >  b[order.keyToSort] ? 1 : -1
        } else{
            return a[order.keyToSort] >  b[order.keyToSort] ? -1 : 1
        }
    })
  }

    return (
        <div className="mt-4">
        <h1>Triathlon Athletes</h1>
        <input id="search-input" onChange={handleSearch} placeholder="Search Athlete by ID"/>
        {/* <input type="button" onClick={() => { handleClick('clear');}}value="Clear"></input> */}
        <button type="button" className="delete" onClick={() => handleDelete(query)}>Delete</button>
        <button type="button" className="edit">Edit</button>
        <button type="button" className="calc">Calculate</button>
        <div>{onSearch(query)}</div>
        <br/>
        <p>Select table headers to reorder entries accordingly.</p>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }