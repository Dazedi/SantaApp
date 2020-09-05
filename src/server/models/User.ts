import fetch from "node-fetch";

export interface IUser {
    username: string;
    uid: string;
}

export class User {
    private static ENDPOINT = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json';

    public static getByUsername = async (username: string) => {
        return fetch(User.ENDPOINT)
            .then((res) => {
                if (res.ok) {
                    return res;
                } else {
                    throw new Error("Unable to retrieve users")
                }
            })
            .then((res) => res.json())
            .then((data: IUser[]) => data.find((user) => user.username === username))
    }
}
export default User;