import { array } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import  ListGroup  from 'react-bootstrap/ListGroup';

//Este es mi ToDo´s con fetch
const URL_API = "https://assets.breatheco.de/apis/fake/todos/user/LuisP"
//create your first component
const Home = (props) => {

	const [inputValue, setInputValue] = useState("");
	const [tareas, setTareas] = useState([]);

	const getToDo = async () =>{
		let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/LuisP",{
			headers:{
				"Content-Type":"application/json"
			},
			method:"GET",
		})
		let data = await response.json()
		setTareas(data)
	}

	useEffect(() => {
	
		getToDo()

	},[]);

	const postToDo = async (newUser) =>{
		let response = await fetch(`${URL_API}`,{
			headers:{
				"Content-Type":"application/json"
			},
			method:"POST",
			body: JSON.stringify( []) 
		})
		let data = await response.json()
		if (response.ok){
			getToDo(newUser)
		}
	}	

	const putToDo = async (newTasks) =>{
		console.log(newTasks)
		let response = await fetch(`${URL_API}`,{
			headers:{
				"Content-Type":"application/json"
			},
			method:"PUT",
			body: JSON.stringify(newTasks) 
		})
		let data = await response.json()
		if (response.ok){
			console.log(data)
			getToDo()
		}
	}

	const handleDeleteUser= async ()=>{
		let response = await fetch(`${URL_API}`,{
			headers:{
				"Content-Type":"application/json"
			},
			method:"PUT",
			body: JSON.stringify(tareas)
		})
		let data = await response.json()
		if (response.status == 200){
			console.log("Eliminado con exito")
		}
	}

	function handleAdd(){	
		// setTareas([{label:inputValue,done:false},...tareas])
		let newTask = [{label:inputValue,done:false},...tareas] 
		putToDo(newTask)
		setInputValue("") 
	}

	function handleDelete(index){	
		let arregloSinEliminar = [...tareas]
		arregloSinEliminar.splice(index, 1);
		setTareas(arregloSinEliminar)
		handleDeleteUser()
	}

	//onMouseEnter={()=>{tarea}} onMouseLeave={() =>{setOculto({display: 'none'})}}

	return (
		<div className="todo-list">
			<div className="lista container">	
			<input type="text" placeholder='Nueva tarea' value={inputValue} 
			onChange={valorInput => setInputValue(valorInput.target.value)} />					
			{/* Para cuando no se usan parametros
			no se debe usar funcion flecha */}
			<button onClick={handleAdd}>Agregar</button>
			
			<h3 className={tareas.length == 0 ? "" : "d-none"}>No hay Tareas!</h3>					
			<ListGroup> 
			{
				tareas.map((tarea,index)=>{
					return(
						<ListGroupItem className='tareabarra' key={index}>
								{/* mouse enter una vez, mouse over es con el y sus hijos
								mouse leave una vez, mouse out es el y sus hijos */}
								<div className='todo d-flex justify-content-around'>
									<div>{tarea.label}</div>
									<div>
									{/* Para cuando se usan parametros
									se debe usar funcion flecha */}
									<button className='boton' onClick={() => handleDelete(index)}>Eliminar</button>
									</div>
								</div>
						</ListGroupItem>	
					)
				})			
			}
			</ListGroup>
			</div>
		</div>
	);
};

export default Home;

