import { render, screen, fireEvent, waitFor, queryByTestId, getByTestId } from "@testing-library/react";
// import '@testing-library/jest-dom'
// https://zenn.dev/naonao70/articles/26fa670a2ef31c
import GoodButton from "./GoodButton";

describe("GoodButton Display Tests", () => {
    it("should render BsHandThumbsUp Button initState is false", () => {
        render(<GoodButton initState={false} />);
        const bsHandThumbsUpButton = screen.getByLabelText("BsHandThumbsUp");
        expect(bsHandThumbsUpButton).toBeDefined();
    });

    it("should render BsHandThumbsUpFill Button initState is true", () => {
        render(<GoodButton initState={true} />);
        const bsHandThumbsUpFillButton = screen.getByLabelText("BsHandThumbsUpFill");
        expect(bsHandThumbsUpFillButton).toBeDefined();
    });

    it("should display BsHandThumbsUpFill Button Click BsHandThumbsUp Button", async () => {
        render(<GoodButton initState={false} />);
        const bsHandThumbsUpButton = screen.getByTestId('BsHandThumbsUp')
        fireEvent.click(bsHandThumbsUpButton);
        await waitFor(() => {
            // expect(screen.queryByTestId('BsHandThumbsUp')).not.toBeInTheDocument();
            // const bsHandThumbsUpFillButton = screen.getByLabelText("BsHandThumbsUpFill");
            // const a = screen.queryByTestId('BsHandThumbsUpFill');
            // const b = screen.queryByTestId('BsHandThumbsUp');
            // console.info(a);
            // console.info(b);
        })
        // const bsHandThumbsUpButton1 = screen.getByTestId('BsHandThumbsUpFill');
    });
});
