import { array } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import  ListGroup  from 'react-bootstrap/ListGroup';

//Este es mi ToDo´s con fetch

//create your first component
const Home = (props) => {

	const [inputValue, setInputValue] = useState("");
	const [tareas, setTareas] = useState([]);
	//const [oculto, setOculto] = useState({display: 'none'});

	/*function agregarValue(valorInput){
		const queHaceres = valorInput.target.value
		setInputValue(queHaceres)
	}*/

	useEffect(() => {
		const getToDo = async () =>{
			let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/ehiber",{
				headers:{
					"Content-Type":"application/json"
				},
				method:"GET",
			})
			let data = await response.json()
			setTasks(data)
		
	}
	getToDo()
	}, [])


	function handleAdd(){	
		setTareas([inputValue,...tareas]) 
		setInputValue("")
	}

	function handleDelete(index){	
		let arregloSinEliminar = [...tareas]
		arregloSinEliminar.splice(index, 1);
		setTareas(arregloSinEliminar)
	}

	//onMouseEnter={()=>{tarea}} onMouseLeave={() =>{setOculto({display: 'none'})}}

	return (
		<div className="todo-list">
			<div className="lista container">	
			<input type="text" placeholder='Nueva tarea' value={inputValue} onChange={valorInput => setInputValue(valorInput.target.value)} />					
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
									<div>{tarea}</div>
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

/* {remaining === 0 ? (
	<span className="product-sold-out">Sold Out</span>
) : (
	<span className="product-remaining">{remaining} remaining</span>
)}
</div> */

export default Home;


