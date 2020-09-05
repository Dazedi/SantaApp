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
    public static createWish = async (data: IWishBase) => {
        const id = Math.ceil(Math.random() * 9999999);
        wishes.push({
            id,
            ...data,
            sent: false
        });
        return true;
    }

    public static updateWish = async (id: number, data: Partial<IWish>) => {
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
}
export default Wish;