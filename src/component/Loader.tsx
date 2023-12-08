import "../style/Loader.css"

const Loader = () => {
    return (
        <div className="loader-container">
            <img className="loader" src={`${process.env.PUBLIC_URL}/loader.gif`} alt={"로딩"}/>
        </div>
    );
}

export default Loader;
