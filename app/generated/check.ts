import typia from "typia";
export const check = (input: any): input is IAddPlace => {
    return "object" === typeof input && null !== input && ("string" === typeof input.title && 5 <= input.title.length && ("string" === typeof input.comment && 1 <= input.comment.length));
};
interface IAddPlace {
    /**
     * @minLength 5
     */
    title: string;
    /**
     * @minLength 1
     */
    comment: string;
}
