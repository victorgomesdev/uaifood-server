fetch('http://localhost:3000/teste', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
       token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2MGYwMTVkODk0YTk5OTFmZTU1NTY3NCIsImVtbCI6InRlc3RlIiwibmFtIjoidmljdG9yIn0.6FcDSKjUIXAYxQ8KdQyowQ8hlJEw-a4pRlzFjKWZ2hc"
    })
}).then(r=> r.text()).then(j=> console.log(j))