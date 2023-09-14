import React from 'react'
import ErrorPage from './errorPage';

class ErrorBoundary extends React.Component {
    
    
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, eventID: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo, mike) {
        console.log("erorr")
        console.log({ error, errorInfo })
    }

    render() {
        if (this.state.hasError) {
            return  <ErrorPage />
        }else{
            return <>
                 {this.props.children}
            </>
        }
        
    }  
}

export default ErrorBoundary;