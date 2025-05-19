import{ Component } from 'react';
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { BsClouds } from "react-icons/bs";
class Card extends Component {
    state = {
        currentTime: null
      };
    
    
    
    
    componentDidMount() {
        const now = new Date();
        this.setState({ currentTime: now });
        this.intervalId = setInterval(() => {
          this.setState({ currentTime: new Date() });
        }, 1000);
    
      }

    componentWillUnmount() {
          clearInterval(this.intervalId)
      }
    
    fahrenheitToCelsius = (fahrenheit) => {
        return (fahrenheit - 273.15 ).toFixed(2);
      }

      formatCurrentTime = () => {
        const { currentTime } = this.state;
        if (!currentTime) return "";
    
        const year = currentTime.getFullYear();
        const month = String(currentTime.getMonth() + 1).padStart(2, "0");
        const day = String(currentTime.getDate()).padStart(2, "0");
    
        const hour = String(currentTime.getHours()).padStart(2, "0");
        const minute = String(currentTime.getMinutes()).padStart(2, "0");
        const second = String(currentTime.getSeconds()).padStart(2, "0");
    
        return `${year}/${month}/${day}   ${hour}:${minute}:${second}s`;
      };
    
    render() {
        const { data } = this.props
        const currentTime = this.formatCurrentTime(this.state.currentTime)
        return (
            <div className='bg-gradient-to-b from-[#422E5A] to-[#1C1B33] w-full max-w-2xl  rounded-3xl px-5 pt-5 pb-20'>
                <p className='text-white text-sm mb-5'>{currentTime}</p>
                <h2 className='text-3xl font-medium text-white text-center mb-5'>{ data?.name}</h2>
                <div className="flex gap-4 justify-center text-[#EBEBF5] font-medium items-center">
                    <p>{data?.weather[0].main}</p>
                    <div className="w-[2px] h-4 bg-[#EBEBF5]"></div>
                    <p className=''>{data?.weather[0].description}</p>
                </div>
                <img src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`} alt="" className='mx-auto ' />
                
                <p className='text-[96px] font-light text-[#EBEBF5] text-center'>{this.fahrenheitToCelsius(data?.main.temp)}°C</p>
                <p className='text-center text-white'>({this.fahrenheitToCelsius(data?.main.feels_like)}°C)</p>

                <div className="flex gap-20 mt-10 justify-center  ">
                    <div className="flex flex-col gap-2 items-center">
                        <WiHumidity className='text-white size-8' />
                        <p className='text-[#EBEBF5] text-sm'>{data?.main.humidity}% | Pressure: {data?.main.pressure} hPa</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <FiWind className='text-white size-8' />
                        <p className='text-[#EBEBF5] text-sm'>{data?.wind.speed} m/s, {data?.wind.deg}°</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <BsClouds className='text-white size-8' />
                        <p className='text-[#EBEBF5] text-sm'>{data?.clouds.all}%</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;