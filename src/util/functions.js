import { useSelector, useDispatch } from "react-redux";

export const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
};

export const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
};

const addWorkout = (workout, week) => {
    const newProgram = useSelector((state) => state.data.newProgram);
    const updatedWeek = {
        ...newProgram.workouts,
        [week]: [...newProgram.workouts[week], workout],
    };

    const data = {
        name: "workouts",
        value: updatedWeek,
    };
    newProgram.workouts[week].concat(workout);
    dispatch(updateNewProgram(data));
    data.name = "workoutCount";
    data.value = newProgram.workoutCount + 1;
    dispatch(updateNewProgram(data));
    data.name = "exerciseCount";
    data.value = newProgram.exerciseCount + workout.exerciseCount;
    dispatch(updateNewProgram(data));
    const newMuscles = workout.muscles.filter(
        (muscle) => !newProgram.muscles.includes(muscle)
    );
    data.name = "muscles";
    data.value = [...newProgram.muscles, ...newMuscles];

    dispatch(updateNewProgram(data));
    const newEquipment = workout.equipment.filter(
        (item) => !newProgram.equipment.includes(item)
    );
    data.name = "equipment";
    data.value = [...newProgram.equipment, ...newEquipment];

    dispatch(updateNewProgram(data));
};
