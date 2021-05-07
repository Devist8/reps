import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { Exercise } from "./Exercise";

const exercise = {
    title: "Lunges",
    difficulty: "3",
    activity: "calisthenics",
    equipment: [],
    motion: "lunges, moderate effort",
    muscles: ["legs", "calfs"],
    schedule: [],
    type: "exercise",
    videoURL:
        "https://firebasestorage.googleapis.com/v0/b/reps-699b0.appspot.com/o/24268207545.mp4?alt=media&token=a7649cc6-e5ea-4359-93fd-d2f1dfe7dd5c",
};

describe("Testing render", () => {
    test("should render exercise", () => {
        const exercise = {
            title: "Lunges",
            difficulty: "3",
            activity: "calisthenics",
            equipment: [],
            motion: "lunges, moderate effort",
            muscles: ["legs", "calfs"],
            schedule: [],
            type: "exercise",
            videoURL:
                "https://firebasestorage.googleapis.com/v0/b/reps-699b0.appspot.com/o/24268207545.mp4?alt=media&token=a7649cc6-e5ea-4359-93fd-d2f1dfe7dd5c",
        };

        const { getByTestId } = render(<Exercise exercise={exercise} />);
        const exerciseElement = screen.getByTestId("exercise-test");
        expect(exerciseElement).toBeInTheDocument();
        expect(exerciseElement).toHaveTextContent("Lunges");
    });
});
