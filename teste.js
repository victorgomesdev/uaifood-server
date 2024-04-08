fetch('http://localhost:3000/user/create', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: 'victorgomesnog123',
        password: '123',
        name: 'Victor Gomes'
    })
}).then(r=> r.text()).then(j=> console.log(j))