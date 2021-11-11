import {useState, useEffect} from 'react'

export const createUseState = func => () => {
    const [values, setValues] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        func()
            .then(res => res.status === 'ok'
                ? setValues(res.data)
                : setError(res.data)
            )
    }, [])

    return {values, error}
}