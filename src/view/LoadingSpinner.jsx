import './loading.css';

const LoadingSpinner = () => {
    return (
        <div className="loading-wrapper">
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;