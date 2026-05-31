// encapsulates all IndexedDB-related operations
class TriathlonDB {
  constructor() {
    this.initializeDB()
  }

  initializeDB() {
    const request = window.indexedDB.open("triathlonDB1", 1)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      db.createObjectStore("athlete", {
        keyPath: "id",
        autoIncrement: true,
      })
    }

    request.onsuccess = (event) => {
      this.db = event.target.result
    }

    request.onerror = (event) => {
      console.error("Error initializing IndexedDB:", event.target.errorCode)
    }
  }

  saveAthlete = (data) => {
    const transaction = this.db.transaction(["athlete"], "readwrite")
    const store = transaction.objectStore("athlete")
    store.add(data)
  }

  getAthlete = (callback) => {
    const transaction = this.db.transaction(["athlete"], "readonly")
    const store = transaction.objectStore("athlete")
    const request = store.getAll()

    request.onsuccess = (event) => {
      callback(event.target.result)
    }

    request.onerror = (event) => {
      console.error("Error retrieving calculations:", event.target.errorCode)
    }
  }
}

export default TriathlonDB