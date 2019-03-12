const remoteURL = "http://localhost:5002"
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
    postAnimal(newAnimal) {
        return fetch(`${remoteURL}/animals`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newAnimal)
        }).then(data => data.json())
      }
};


export default animalAPIManager;