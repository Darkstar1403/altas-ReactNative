import { useState, useEffect, useRef } from "react"

export const useFetch = (url) =>{

    const isMounted = useRef(true)

    const [state, setState] = useState({data:null, loading:true, error:null})
   //utilizamos como referencia al componente en si mismo asi que cuando
   //se desmonta en este useEffect que solo se ejecuta al inicio del render
   //entonces el isMounted se cambia a false y nos permite usarlo como
   //bandera para cancelar una operacion que no tuvo tiempo
    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        setState({data:null, loading:true, error:null});
        fetch(url).then(resp => resp.json()).then(data =>{
            if(isMounted.current){
                setState({
                    loading:false,
                    error:null,
                    data
                });
            }
        }).catch(()=>{
            setState({loading: false, error: 'No se pudo cargar la info', data:null})
        });
    }, [url])
    
    return state
}