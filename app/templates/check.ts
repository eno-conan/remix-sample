import typia from "typia";

export const check = typia.createIs<IAddPlace>();

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