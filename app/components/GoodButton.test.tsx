import { render, screen, fireEvent } from "@testing-library/react";
import GoodButton from "./GoodButton";

describe("GoodButton Display Tests", () => {
    it("should render BsHandThumbsUp Button initState is false", () => {
        render(<GoodButton initState={false} />);
        const bsHandThumbsUpButton = screen.getByLabelText("BsHandThumbsUp");
        expect(bsHandThumbsUpButton).toBeDefined();
    });

    it("should render BsHandThumbsUp Button initState is true", () => {
        render(<GoodButton initState={true} />);
        const bsHandThumbsUpFillButton = screen.getByLabelText("BsHandThumbsUpFill");
        expect(bsHandThumbsUpFillButton).toBeDefined();
    });
});