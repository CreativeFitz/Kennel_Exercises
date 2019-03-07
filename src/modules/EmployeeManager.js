const employeeAPIManager = {
    getAllEmployees: () => {
        return fetch("http://localhost:5002/employees")
        .then(employees => employees.json());
    },
    deleteEmployee: (id) => {
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
    }
}

export default employeeAPIManager