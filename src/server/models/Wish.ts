export interface IWishBase {
  address: string;
  username: string;
  message: string;
}

export interface IWish extends IWishBase {
  id: number;
  sent: boolean;
}

/**
 * Hold the wishes in memory for the purposes of this app
 */
const wishes: IWish[] = [];

export class Wish {
  public static validateWishBase(data: Partial<IWishBase>, update: boolean = false) {
    if (((!update && data.address) || update) && data.address === "") {
      console.error("Wish address cannot be empty");
      return { address: "Wish address cannot be empty" };
    }
    if (((!update && data.username) || update) && data.username === "") {
      console.error("Wish username cannot be empty");
      return { username: "Wish username cannot be empty" };
    }
    if (((!update && data.message) || update) && data.message === "") {
      console.error("Wish message cannot be empty");
      return { message: "Wish message cannot be empty" };
    }

    return null;
  }

  public static createWish = async (data: IWishBase) => {
    if (Wish.validateWishBase(data)) {
      throw new Error(data.message);
    }

    const id = Math.ceil(Math.random() * 9999999);
    wishes.push({
      id,
      ...data,
      sent: false
    });
    return id;
  }

  public static updateWish = async (id: number, data: Partial<IWish>) => {
    if (Wish.validateWishBase(data, true)) {
      throw new Error(data.message);
    }
    const wishIdx = wishes.findIndex((wish) => wish.id === id);
    if (wishIdx < 0) return false;
    wishes[wishIdx] = {
      ...wishes[wishIdx],
      ...data
    };
    return true;
  }

  public static getUnsentWishes = async () => {
    return wishes.filter((wish: IWish) => wish.sent === false);
  }

  public static getWishById = async (id: number) => {
    return wishes.find((wish) => wish.id === id);
  }
}
export default Wish;
