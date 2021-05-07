import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { ProgramModal } from "./ProgramModal";
import { program } from "../../util/TestData";

describe("Testing render", () => {
    test("Should render workout", () => {
        const { getByTestId } = render(<ProgramModal program={program} />);
        const tree = renderer
            .create(<ProgramModal program={program} />)
            .toJSON();
        const programElement = screen.getByTestId("program-modal-test");
        expect(programElement).toBeInTheDocument();
        expect(tree).toMatchSnapshot();
        expect(programElement).toHaveTextContent("First Program");
    });
});
