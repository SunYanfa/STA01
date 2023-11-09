import React, { Component } from "react";

class PixelCanvas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDrawing: false,
        };

        this.canvasRef = React.createRef();
        this.colorPickerRef = React.createRef();
    }

    handleMouseDown = () => {
        this.setState({ isDrawing: true });
    };

    handleMouseUp = () => {
        this.setState({ isDrawing: false });
  
    };

    handleMouseMove = (event) => {
        const canvas = this.canvasRef.current;
        const context = canvas.getContext("2d");
    
        if (this.state.isDrawing) {
            const pixelSize = 8;
            const x =
                Math.floor((event.clientX - canvas.getBoundingClientRect().left) / pixelSize) *
                pixelSize;
            const y =
                Math.floor((event.clientY - canvas.getBoundingClientRect().top) / pixelSize) *
                pixelSize;
            const color = this.colorPickerRef.current.value;
    
            context.fillStyle = color;
            context.fillRect(x, y, pixelSize, pixelSize);
    
            // Aqui guarda los datos de canvas
            // let base64Canvas = canvas.toDataURL("image/jpeg");
            let base64Canvas = canvas.toDataURL();
            this.props.handleCanvasChange(base64Canvas);
        }
    };
    
    


    componentDidUpdate(prevProps) {
        if (this.props.lastJsonMessage !== prevProps.lastJsonMessage) {
            const canvas = this.canvasRef.current;
            const context = canvas.getContext("2d");


            // Crear una nuevo objecto de canva
            if (prevProps.lastJsonMessage){
                const imgaeLast = new Image();
                imgaeLast.src = prevProps.lastJsonMessage['canvasData'];
                imgaeLast.onload = () => {
                    context.drawImage(imgaeLast, 0, 0, canvas.width, canvas.height);
                }
            }


            const image = new Image();
            image.src = this.props.lastJsonMessage['canvasData'];

            // Cuando la imagen esté cargada, dibújala en el lienzo.
            image.onload = () => {
                // context.clearRect(0, 0, canvas.width, canvas.height); 
                context.drawImage(image, 0, 0, canvas.width, canvas.height);

            };
        }
    }




    render() {
        const canvasWidth = this.props.width || 1000;
        const canvasHeight = this.props.height || 500;
        const lastJsonMessage = this.props.lastJsonMessage;

        return (
            <>
                <div id="canvasBox">
                    <canvas
                        ref={this.canvasRef}
                        id="pixelCanvas"
                        width={canvasWidth}
                        height={canvasHeight}
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp}
                        onMouseMove={this.handleMouseMove}
                    // onChange={this.handleCanvasChange}
                    ></canvas>
                    <input ref={this.colorPickerRef} id="colorPicker" type="color" />
                </div>
                <div>
                    {lastJsonMessage ? (
                        <div>{lastJsonMessage.someProperty}</div>
                    ) : null}

                </div>
            </>

        );
    }
}

export default PixelCanvas;
