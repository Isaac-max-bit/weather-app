import "./current-weather.css";

const Currentweather = () => {
    return (
        <div className="weather">
            <div className="top">
                <p className="city">Belgrade</p>
                <p className="weather-description">Sunny</p>
            </div>
            <img alt="weather" className="weather-icon" src="weather-icon.png" />
        </div>
    );
}

export default Currentweather;