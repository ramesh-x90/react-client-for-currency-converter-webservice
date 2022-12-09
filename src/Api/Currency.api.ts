import axios from "axios"

export interface CodeNamePair {
    code: string;
    name: string
}

export const getCodeNames = async () => {
    const data = await axios.get("http://localhost:4000/codeNames")
    return data.data as CodeNamePair[]

}

export const convert = async (amount: number, sourceCurrency: string, targetCurrency: string) => {

    try {
        const res = await axios.post("http://localhost:4000/convert", {
            amount,
            sourceCurrency,
            targetCurrency

        }, { validateStatus: (code) => code != 400 })

        const data = res.data

        if (data.error) throw Error(data.error)

        return data as number
    } catch (error) {
        throw error as Error
    }

}