import { useState, type ChangeEvent } from 'react'

type FieldTypes = "username" | "password" | string & {}
type LoginFormFields = {
    username: {
        value: string,
        error: string
    },
    password: {
        value: string,
        error: string
    }
}
export default function useLoginHandler() {
    const initState: LoginFormFields = {
        username: {
            value: "",
            error: ""
        },
        password: {
            value: "",
            error: ""
        },

    }
    const [formFields, setFormFields] = useState<LoginFormFields>(initState)

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/

    const validateUsername = (username: string): boolean => {
        const u = username.trim()
        if (!usernameRegex.test(u)) {
            setFormFields({
                ...formFields,
                username: {
                    ...formFields.username,
                    error: "Username not valid"
                }
            })

            return false
        }
        return true
    }

    const validatePassword = (password: string): boolean => {
        const p = password.trim()
        if (p.length < 8) {
            setFormFields({
                ...formFields,
                password: {
                    ...formFields.password,
                    error: "Password not valid"
                }
            })
            return false
        }
        return true
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, inputType: FieldTypes) => {
        const inputValue = e.target.value
        switch (inputType) {
            case "username":
                setFormFields({
                    ...formFields,
                    username: {
                        value: e.target.value,
                        error: ""
                    }
                })
                break
            case "password":
                setFormFields({
                    ...formFields,
                    password: {
                        value: e.target.value,
                        error: ""
                    }
                })
                break
            default:
                setFormFields({
                    ...formFields,
                    username: {
                        ...formFields.username,
                        error: "An unknown error occured"
                    },
                    password: {
                        ...formFields.password,
                        error: "An unknown error occured"
                    }
                })
                break;
        }
    }

    return {
        formFields,
        setFormFields,
        handleInputChange,
        validatePassword,
        validateUsername
    }
}

