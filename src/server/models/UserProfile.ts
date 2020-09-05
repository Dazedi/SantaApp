import fetch from "node-fetch";

export interface IUserProfile {
    userUid: string;
    address: string;
    birthdate: string;
}

export class UserProfile {
    private static ENDPOINT = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json';

    public static getByUid = async (uid: string) => {
        return fetch(UserProfile.ENDPOINT)
            .then((res) => {
                if (res.ok) {
                    return res;
                } else {
                    throw new Error("Unable to retrieve user profiles")
                }
            })
            .then((res) => res.json())
            .then((data: IUserProfile[]) => data.find((profile) => profile.userUid === uid))
    }
}
export default UserProfile;