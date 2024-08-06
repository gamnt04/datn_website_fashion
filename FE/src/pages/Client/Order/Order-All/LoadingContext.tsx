
import React, { createContext, useState } from 'react'


export const LoadingContext = createContext({
    isActive: false,
    setActive: (isActive: boolean) => {}
});
const LoadingProvider = ({children}: any) => {
    const [isActive, setActive] = useState<any>(false)
return (
    <LoadingContext.Provider value={{isActive, setActive}}>
            {children}
    </LoadingContext.Provider>
)

}

export default LoadingProvider