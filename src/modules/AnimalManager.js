const animalAPIManager = {
    getAllAnimals: () => {
        return fetch("http://localhost:5002/animals")
        .then(animals => animals.json());
    },
    deleteAnimal: (id) => {
        return fetch(`http://localhost:5002/animals/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json()
        );
    },
};


export default animalAPIManager;