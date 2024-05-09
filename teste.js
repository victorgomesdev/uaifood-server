fetch('http://localhost:3000/device/create', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        token: "hhljfkhdljulduguhdjgfçugugfdugçuigpçfuutguigfp",
        name: 'jhjklglhkgdklj',
        description: 'hgfldkjugfjdgfldkj',
        code: 1,
        owner_id: 1,
        imageUrl: 'hjdgfkhgfh'
    })
}).then(r => r.json()).then(j => console.log(j))