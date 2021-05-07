import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { Workout } from "./Workout";
import { workout } from "../../util/TestData";

describe("Testing render", () => {
    test("Should render workout", () => {
        const { getByTestId } = render(<Workout workout={workout} />);
        const workoutElement = screen.getByTestId("workout-test");
        expect(workoutElement).toBeInTheDocument();
        expect(workoutElement).toHaveTextContent("First Workout");
    });
});
