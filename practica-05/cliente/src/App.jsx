import './App.css'
import PixelCanvas from './CanvasBox'
import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';


function App() {
	const socketUrl = 'ws://127.0.0.1:8000';
	const [user, setUser] = useState();

	const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl);

	// Enviar los datos al servidor
    const handleCanvasChange = (base64Canvas) => {
        sendJsonMessage({ canvasData: base64Canvas });
    }

	// El estado de la conexion de servidor
	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Conectado',
		[ReadyState.OPEN]: 'Abierto',
		[ReadyState.CLOSING]: 'Clausura',
		[ReadyState.CLOSED]: 'Cerrado',
		[ReadyState.UNINSTANTIATED]: 'Sin instanciar',
	  }[readyState];


	  const parametros = {
		color: "#ccc"
	  }
	

	return (
		<>
		<div id='mainBox'>
			<h1>Pizarra Compartida</h1>
			<p>Hola, Bienvenidos</p> 
			<p>el WebSocket está actualmente en <span className='estado'>{connectionStatus}</span></p>
			{/* <input type="text" onChange={e => setUser(e.target.value)} placeholder='UserName'/> */}
			<br />
		</div>
		<div id='toolBox'>
			<button>Borrar todo</button>
		</div>
		<PixelCanvas 
			handleCanvasChange={handleCanvasChange} 
			lastJsonMessage={lastJsonMessage}
		 />

		</>
	);
}

export default App
