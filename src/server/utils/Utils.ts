export default class Utils {
    public static pick = (object: any, fields: string[]) => {
        let obj = {};
        for (const field in fields) {
            if (
                object && 
                typeof object === "object" && 
                Object.prototype.hasOwnProperty.call(object, field)
            ) {
                obj[field] = object[field];
            }
        }
        return obj;
    }
}