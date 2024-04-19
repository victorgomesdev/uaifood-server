fetch('http://localhost:3000/user/edit', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        token: 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2MjJhMGNkNGNhYTZkZTQ3MmZjMmY0YyIsImVtYWlsIjoidmljdG9yZ29tZXNub2cxMjNAZ21haWwuY29tIiwibmFtZSI6IlZpY3RvciBHb21lcyBOb2d1ZWlyYSJ9.MPjVPDT2hMYkWlefm7V0Kdes0n_npD2cg7j4Y_oUsoI',
        _id: '6622a0cd4caa6de472fc2f4c',
        name: 'Victor Gomes Nogueira editado 5',
        email: 'victorgomesnog123@gmail.com',
        password: '123456'
    })
}).then(r => r.json()).then(j => console.log(j))