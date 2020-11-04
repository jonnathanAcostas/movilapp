import React from 'react'
import { LineChart, Grid, AreaChart } from 'react-native-svg-charts'
import {View, Text, Image } from 'react-native'
import {Button} from "react-native-web";

class GraphicsSensors extends React.PureComponent {

    constructor(props) {
        super(props);
        this.endpoint = 'http://localhost:8000';
        //this.endpoint = 'http://yourIP:8000';
        this.state = {
            loading:false,
            sensor1: [],
            sensor2: [],
            sensor3: [],
            urlSemana: `${this.endpoint}/api/getSensorValorSem`,
            urlHora: `${this.endpoint}/api/getSensorValorHora`,
            urlDay: `${this.endpoint}/api/getSensorValorDay`,
            urlMonth: `${this.endpoint}/api/getSensorValorMen`

        }
        this.getGraphicsMensual = this.getGraphicsMensual.bind(this)
        this.getGraphicsDiario = this.getGraphicsDiario.bind(this)
        this.getGraphicsHora = this.getGraphicsHora.bind(this)
        this.getGraphicsSemana = this.getGraphicsSemana.bind(this)
    }

    componentDidMount() {
        console.log('Entre a la pantalla semana')
        this.getGraphicsDiario();
    }
    actualizar(){
        // linea de codigo que actualize la pagina haga refresh
      window.location.reload();
    }

  getGraphicsHora(){
      this.setState({
          loading: true
      })
        fetch(this.state.urlHora)
            .then((res) => res.json())
            .then((res) =>{
                this.setState({
                    sensor1: res.sensors_valor1.sensors,
                    sensor2: res.sensors_valor2.sensors,
                    sensor3: res.sensors_valor3.sensors,
                    loading:false
                })
            }).catch(error =>{
            console.error(error)
            this.setState({
                loading : false
            })
            alert('Intente mas tarde')
        })
    }
   getGraphicsDiario(){
       this.setState({
           loading: true
       })
        fetch(this.state.urlDay)
            .then((res) => res.json())
            .then((res) =>{
                this.setState({
                    sensor1: res.sensors_valor1.sensors,
                    sensor2: res.sensors_valor2.sensors,
                    sensor3: res.sensors_valor3.sensors,
                    loading:false
                })
            }).catch(error =>{
            console.error(error)
            this.setState({
                loading : false
            })
            alert('Intente mas tarde')
        })
    }
   getGraphicsMensual(){
       this.setState({
           loading: true
       })
        fetch(this.state.urlMonth)
            .then((res) => res.json())
            .then((res) =>{
                this.setState({
                    sensor1: res.sensors_valor1.sensors,
                    sensor2: res.sensors_valor2.sensors,
                    sensor3: res.sensors_valor3.sensors,
                    loading:false
                })
            }).catch(error =>{
            console.error(error)
            this.setState({
                loading : false
            })
            alert('Intente mas tarde')
        })
    }
     getGraphicsSemana(){
         this.setState({
             loading: true
         })

        fetch(this.state.urlSemana)
            .then((res) => res.json())
            .then((res) =>{
                this.setState({
                    sensor1: res.sensors_valor1.sensors,
                    sensor2: res.sensors_valor2.sensors,
                    sensor3: res.sensors_valor3.sensors,
                    loading:false
                })
            }).catch(error =>{
            console.error(error)
            this.setState({
                loading : false
            })
            alert('Intente mas tarde')
        })
    }
    render() {


        let data1 = []
        let data2 = []
        let data3 = []
        this.state.sensor1.map(sensor=>{
            data1.push(parseInt(sensor.valor))
        })
        this.state.sensor2.map(sensor=>{
            data2.push(parseInt(sensor.valor))
        })
        this.state.sensor3.map(sensor=>{
            data3.push(parseInt(sensor.valor))
        })

        const datos2 =[
            {
                data:data2,
                svg :{stroke:'purple'}
            }
        ]
        const datos3 =[
            {
                data:data3,
                svg :{stroke:'black'}
            }
        ]

        const datos1 = [
            {
                data: data1,
                svg: { stroke: 'red' },
            }
            
        ]
            if(this.state.loading){
                return (
                    <View style={{justifyContent:'center'}}>
                        <Text>Construyendo Grafico</Text>
                        <Image
                            source={require('../assets/loadingFinl.gif')}
                            style={{width: 60, height:60,right:'-30%' }}
                        />
                    </View>
                )
            }
                return (
                    <View>
                        <button onClick={this.getGraphicsHora} >Hora</button>
                        <button onClick={this.getGraphicsDiario} >Diario</button>
                        <button onClick={this.getGraphicsSemana} >Semanal</button>
                        <button onClick={this.getGraphicsMensual} >Mensual</button>
                        <Text style={{color:"red",
                            fontSize:"25px"}}>Medida de tipo porcentaje</Text>
                        <LineChart
                            style={{ height: 130, width: 400 }}
                            data={datos1}
                            contentInset={{ top: 20, bottom: 20 }}
                        >
                            <Grid />
                        </LineChart>
                        <Text style={{color:"purple",
                            fontSize:"25px"}}>Medida de tipo Celcius</Text>
                        <LineChart
                            style={{ height: 130, width: 400 }}
                            data={datos2}
                            contentInset={{ top: 20, bottom: 20 }}
                        >
                            <Grid />
                        </LineChart>
                        <Text style={{
                            color:"black",
                            fontSize:"25px"
                        }}>Medida de tipo uS/cm</Text>
                        <LineChart
                            style={{ height: 130, width: 400 }}
                            data={datos3}
                            contentInset={{ top: 20, bottom: 20 }}
                        >
                            <Grid />
                        </LineChart>
                    </View>
                )



    }
}


export default GraphicsSensors
