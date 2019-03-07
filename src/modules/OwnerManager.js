const ownerAPIManager = {
    getAllOwners: () => { return fetch("http://localhost:5002/owners")
    .then(owners => owners.json());
    },
    deleteOwner: (id) => {
    return fetch(`http://localhost:5002/owners/${id}`, {
        method: "DELETE"
    })
    .then(e => e.json()
    );
    },
}

export default ownerAPIManager