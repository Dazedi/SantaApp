interface ICreateResult {
    status: string;
    message?: string;
    data?: any;
}

interface ICreateMessage {
    username: string;
    message: string;
}

export default class SantaAPI {
    private static ENDPOINTS = {
        CREATE_MESSAGE: "/v1/wish"
    }
    public static createMessage = async (data: ICreateMessage): Promise<ICreateResult> => {
        try {
            const response = await fetch(SantaAPI.ENDPOINTS.CREATE_MESSAGE, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            // Regardless of the status code,
            // The API should return data in JSON (except 404)
            if (response.status !== 404) {
                const result: ICreateResult = await response.json();
                return result;
            } else {
                return {
                    status: "error",
                    message: "API Not found"
                }
            }
        } catch (err) {
            return {
                status: "error",
                message: err.message
            }
        } 
    }
}