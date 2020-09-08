import { User, UserProfile, Wish } from "../models";
import { DateTime } from "luxon";

interface ICreateWish {
  username: string;
  message: string;
}

export default class WishService {
  public static createWish = async (data: ICreateWish) => {
    const user = await User.getByUsername(data.username);
    if (!user) {
      throw "User not found";
    }

    const userProfile = await UserProfile.getByUid(user.uid);
    if (!userProfile) {
      throw "UserProfile not found";
    }

    // Birthdate is in YYYY/DD/MM format
    const birthdate = DateTime.fromFormat(userProfile.birthdate, 'yyyy/dd/MM');
    const now = DateTime.local();

    // Should be fine until just before they turn 11
    if (now >= birthdate.plus({ years: 11 })) {
      throw "User is more than 10 years old";
    }

    const success = await Wish.createWish({
      username: user.username,
      address: userProfile.address,
      message: data.message
    });

    if (!success) {
      throw "Wish could not be created";
    }

    return "Wish was created successfully";
  }
}
