import React, {Component} from 'react';
import './Main.scss'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Main extends Component {

    constructor() {
        super();
        this.state = {
            data: {},
            zoom:11,
            center:{
                lat:0,
                lng:0
            },
            deviceWidth:window.innerWidth
        }
    }
        componentDidMount() {

            fetch('https://ipapi.co/json/')
                .then(res=>res.json())
                .then(data=>{
                  this.setState({
                      data:data,
                  })
                })
        }


    render() {

        let dataKeys = Object.keys(this.state.data);
        let dataValue = Object.values(this.state.data);

        let dataTable = dataKeys.map(key =>{
            return(
                <div className='dataTableRow'>
                    <p>{key} : </p>
                    <p>{dataValue[dataKeys.indexOf(key)]}</p>
                </div>
            )
        });

        const mapStyle = {
            width: '',
            height: ''
        };

        if (this.state.deviceWidth< 767){
            mapStyle.width = '300px'
            mapStyle.height = '250px'

        } else {
            mapStyle.width = '1200px'
            mapStyle.height = '600px'
        }

        console.log(this.state.data.longitude)

        let mapGen = ()=>{
            if (this.state.data.longitude !== undefined) {
                return(
                    <Map  className='googleMap' google={this.props.google} zoom={18} initialCenter={{lng:this.state.data.longitude,lat:this.state.data.latitude}} style={mapStyle}>
                        <Marker
                                name={'Current location'} />
                        <InfoWindow >
                            <div>
                                <h1></h1>
                            </div>
                        </InfoWindow>
                    </Map>
                )
            }

        };

        return (
            <div className='Main'>
                <h1>What is my IP Address ?</h1>
                <span className='ipAddressTitle'>Your IP Address is :</span>
                <p className='ip' ref={ip=>this.ip=ip}>{this.state.data.ip}</p>
                <div className="data" ref={data=>this.data=data}>
                    {dataTable}
                </div>

    {/*<GoogleMapReact defaultCenter={{lat: 59.95, lng: 30.33}} defaultZoom={this.state.zoom}  bootstrapURLKeys={{ key: 'AIzaSyAEYCD5waZLhtWh21mxspBuR9_9RpCADQA',language: 'en'}}/>*/}
                {mapGen()}

            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyAEYCD5waZLhtWh21mxspBuR9_9RpCADQA')
})(Main)