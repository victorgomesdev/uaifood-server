fetch('http://localhost:3000/teste', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MyJpZCI6IjY2MTQzODZlOTc3ZmNhMDlmOTY4ZDgwNCIsImVtbCI6InZpY3RvcmdvbWVzbm9nMTIzIiwibmFtIjoiVmljdG9yIEdvbWVzIiwiaWF0IjoxNzEzMTk4NDA5fQ.8gBfA1BDz7nrJHwJeSbpv8gBfA1BDzj6F7nrBDAMaqOvFxXB1E1NEzU`,
    })
}).then(r=> r.text()).then(j=> console.log(j))